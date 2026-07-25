import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { LessonStorePort } from "@/src/common/ports/lesson.store.port";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import {
  calculateTotalLessonDuration,
  useLessonStore,
} from "@/src/infra/store/lesson.store";
import { BimesterApiService } from "@/src/features/bimester/api/bimester.service";
import { BimesterServicePort } from "@/src/features/bimester/api/bimester.service.port";
import { useEffect, useState } from "react";
import { LessonApiService } from "../api/lesson.service";
import { LessonServicePort } from "../api/lesson.service.port";
import { Lesson } from "../types/lesson.types";

export type RecalibrateParams = {
  activityId: string;
  emphasis: "alta" | "media" | "baixa";
  complexity: "diminuir" | "manter" | "aumentar";
  observations: string;
};

const defaultLessonService = new LessonApiService();
const defaultBimesterService = new BimesterApiService();

export function useLessonDetailViewModel(
  lessonIdentifier: string,
  classId?: string,
  lessonStore: LessonStorePort = useLessonStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  lessonService: LessonServicePort = defaultLessonService,
  bimesterService: BimesterServicePort = defaultBimesterService,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);
  const setBimesters = bimesterStore((state) => state.setBimesters);

  const plansByClassAndBimester = lessonStore(
    (state) => state.plansByClassAndBimester,
  );
  const setPlan = lessonStore((state) => state.setPlan);
  const updateActivityCompletionOptimistic = lessonStore(
    (state) => state.updateActivityCompletionOptimistic,
  );
  const updateActivityInLesson = lessonStore(
    (state) => state.updateActivityInLesson,
  );
  const updateLessonOptimistic = lessonStore(
    (state) => state.updateLessonOptimistic,
  );
  const rollbackPlan = lessonStore((state) => state.rollbackPlan);

  const activeBimesterId =
    selectedBimesterId ||
    bimesters.find((b) => b.status === "in_progress")?.id ||
    bimesters[0]?.id ||
    "";

  const targetClassId = classId || "class-1";
  const storeKey = `${targetClassId}_${activeBimesterId}`;
  const plan = plansByClassAndBimester[storeKey];

  useEffect(() => {
    let isMounted = true;
    if (!plansByClassAndBimester[storeKey]) {
      queueMicrotask(() => {
        if (!isMounted) return;
        setIsLoading(true);
        setError(null);
      });

      lessonService
        .getClassPlan({ classId: targetClassId, bimesterId: activeBimesterId })
        .then((domainPlan) => {
          if (isMounted && domainPlan) {
            setPlan(targetClassId, activeBimesterId, domainPlan);
          }
        })
        .catch((err: any) => {
          if (isMounted) {
            console.error(
              "Error fetching lesson plan in useLessonDetailViewModel:",
              err,
            );
            setError(err?.message || "Erro ao carregar os dados da aula");
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [
    plansByClassAndBimester,
    storeKey,
    lessonService,
    targetClassId,
    activeBimesterId,
    setPlan,
  ]);

  const lesson: Lesson | undefined = plan?.lessons.find(
    (l) =>
      String(l.lessonNumber) === String(lessonIdentifier) ||
      l.id === lessonIdentifier,
  );

  const activities = lesson?.activities ?? [];
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleActivityCompletion = async (activityId: string) => {
    if (!plan || !lesson) return;

    const targetActivity = activities.find((act) => act.id === activityId);
    const newCompleted = targetActivity ? !targetActivity.completed : true;
    const snapshot = plan;

    updateActivityCompletionOptimistic(
      targetClassId,
      activeBimesterId,
      lessonIdentifier,
      activityId,
      newCompleted,
    );

    try {
      const domainPlan = await lessonService.toggleActivityCompletion({
        planId: plan.id,
        lessonNumber: lesson.lessonNumber,
        activityId,
        completed: newCompleted,
      });

      if (domainPlan) {
        setPlan(targetClassId, activeBimesterId, domainPlan);
      }

      // Revalidate bimesters in background (fire-and-forget)
      bimesterService
        .getBimesters()
        .then((updatedBimesters) => {
          if (updatedBimesters && updatedBimesters.length > 0) {
            setBimesters(updatedBimesters);
          }
        })
        .catch((err) => {
          console.debug(
            "[Background Revalidate] Error fetching bimesters after activity toggle:",
            err,
          );
        });
    } catch (err: any) {
      console.error("Error toggling activity completion:", err);
      rollbackPlan(targetClassId, activeBimesterId, snapshot);
      setError(err?.message || "Erro ao atualizar conclusão da atividade");
    }
  };

  const [isRecalibrating, setIsRecalibrating] = useState(false);

  const recalibrateActivity = async (params: RecalibrateParams) => {
    if (!plan || !lesson) return;

    setIsRecalibrating(true);
    setError(null);
    try {
      const updatedActivity = await lessonService.recalibrateActivity({
        planId: plan.id,
        lessonNumber: lesson.lessonNumber,
        activityId: params.activityId,
        emphasis: params.emphasis,
        complexity: params.complexity,
        observations: params.observations,
      });

      if (updatedActivity) {
        updateActivityInLesson(
          targetClassId,
          activeBimesterId,
          lessonIdentifier,
          updatedActivity,
        );
      }
    } catch (err: any) {
      console.error("Error recalibrating activity:", err);
      setError(err?.message || "Erro ao recalibrar atividade");
    } finally {
      setIsRecalibrating(false);
    }
  };

  const removeActivity = (activityId: string) => {
    if (!plan || !lesson) return;

    const updated = activities.filter((act) => act.id !== activityId);
    const newDuration = calculateTotalLessonDuration(updated);
    updateLessonOptimistic(targetClassId, activeBimesterId, lessonIdentifier, {
      activities: updated,
      duration: newDuration,
    });
  };

  const saveChanges = async () => {
    if (!plan || !lesson) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    const snapshot = plan;

    try {
      const domainPlan = await lessonService.saveLesson({
        planId: plan.id,
        lessonNumber: lesson.lessonNumber,
        lesson,
      });

      if (domainPlan) {
        setPlan(targetClassId, activeBimesterId, domainPlan);
      }
    } catch (err: any) {
      console.error("Error saving lesson changes:", err);
      rollbackPlan(targetClassId, activeBimesterId, snapshot);
      setError(err?.message || "Erro ao salvar alterações da aula");
    }
  };

  return {
    lesson,
    activities,
    isEditing,
    isRecalibrating,
    isLoading,
    error,
    toggleEditMode,
    saveChanges,
    toggleActivityCompletion,
    removeActivity,
    recalibrateActivity,
  };
}
