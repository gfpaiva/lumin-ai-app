import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { HttpPort } from "@/src/common/ports/http.port";
import { LessonStorePort } from "@/src/common/ports/lesson.store.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useLessonStore } from "@/src/infra/store/lesson.store";
import { useCallback, useEffect, useState } from "react";
import { mapClassPlanDtoToDomain } from "../mappers/class-plan.mapper";
import { Activity, ClassPlanDto, Lesson } from "../types/lesson.types";

export type RecalibrateParams = {
  activityId: string;
  emphasis: "alta" | "media" | "baixa";
  complexity: "diminuir" | "manter" | "aumentar";
  observations: string;
};

const defaultHttpAdapter = new FetchAdapter();

export function useLessonDetailViewModel(
  lessonIdentifier: string,
  classId?: string,
  lessonStore: LessonStorePort = useLessonStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  httpAdapter: HttpPort = defaultHttpAdapter,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);

  const plansByClassAndBimester = lessonStore(
    (state) => state.plansByClassAndBimester,
  );
  const setPlan = lessonStore((state) => state.setPlan);

  const activeBimesterId =
    selectedBimesterId ||
    bimesters.find((b) => b.status === "in_progress")?.id ||
    bimesters[0]?.id ||
    "";

  const targetClassId = classId || "class-1";
  const storeKey = `${targetClassId}_${activeBimesterId}`;
  const plan = plansByClassAndBimester[storeKey];

  const fetchPlanIfNeeded = useCallback(async () => {
    if (plansByClassAndBimester[storeKey]) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await httpAdapter.get<ClassPlanDto>("/class-plans", {
        params: { classId: targetClassId, bimesterId: activeBimesterId },
      });
      if (response.data) {
        const domainPlan = mapClassPlanDtoToDomain(response.data);
        setPlan(targetClassId, activeBimesterId, domainPlan);
      }
    } catch (err: any) {
      console.error(
        "Error fetching lesson plan in useLessonDetailViewModel:",
        err,
      );
      setError(err?.message || "Erro ao carregar os dados da aula");
    } finally {
      setIsLoading(false);
    }
  }, [
    plansByClassAndBimester,
    storeKey,
    httpAdapter,
    targetClassId,
    activeBimesterId,
    setPlan,
  ]);

  useEffect(() => {
    fetchPlanIfNeeded();
  }, [fetchPlanIfNeeded]);

  const lesson: Lesson | undefined = plan?.lessons.find(
    (l) =>
      String(l.lessonNumber) === String(lessonIdentifier) ||
      l.id === lessonIdentifier,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [localActivities, setLocalActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (lesson?.activities) {
      setLocalActivities(lesson.activities);
    }
  }, [lesson?.activities]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const toggleActivityCompletion = (activityId: string) => {
    setLocalActivities((prev) =>
      prev.map((act) =>
        act.id === activityId ? { ...act, completed: !act.completed } : act,
      ),
    );
  };

  const removeActivity = (activityId: string) => {
    setLocalActivities((prev) => prev.filter((act) => act.id !== activityId));
  };

  const [isRecalibrating, setIsRecalibrating] = useState(false);

  const recalibrateActivity = async (params: RecalibrateParams) => {
    setIsRecalibrating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 7000));

      setLocalActivities((prev) =>
        prev.map((act) =>
          act.id === params.activityId
            ? {
                ...act,
                description: `${act.description} (Recalibrado: Ênfase ${params.emphasis}, Complexidade ${params.complexity})`,
              }
            : act,
        ),
      );
    } finally {
      setIsRecalibrating(false);
    }
  };

  return {
    lesson,
    localActivities,
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
