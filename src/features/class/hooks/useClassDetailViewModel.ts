import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { ClassStorePort } from "@/src/common/ports/class.store.port";
import { HttpPort } from "@/src/common/ports/http.port";
import { LessonStorePort } from "@/src/common/ports/lesson.store.port";
import { SchoolStorePort } from "@/src/common/ports/school.store.port";
import { mapClassPlanDtoToDomain } from "@/src/features/lesson/mappers/class-plan.mapper";
import { ClassPlanDto, Lesson } from "@/src/features/lesson/types/lesson.types";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useClassStore } from "@/src/infra/store/class.store";
import { useLessonStore } from "@/src/infra/store/lesson.store";
import { useSchoolStore } from "@/src/infra/store/school.store";
import { useCallback, useEffect, useState } from "react";

const defaultHttpAdapter = new FetchAdapter();

export function useClassDetailViewModel(
  classId: string,
  lessonStore: LessonStorePort = useLessonStore,
  classStore: ClassStorePort = useClassStore,
  schoolStore: SchoolStorePort = useSchoolStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  httpAdapter: HttpPort = defaultHttpAdapter,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classes = classStore((state) => state.classes);
  const schools = schoolStore((state) => state.schools);
  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);

  const plansByClassAndBimester = lessonStore(
    (state) => state.plansByClassAndBimester,
  );
  const setPlan = lessonStore((state) => state.setPlan);

  const currentClass = classes.find((c) => c.id === classId);
  const currentSchool = schools.find((s) => s.id === currentClass?.schoolId);

  const activeBimester = bimesters.find((b) => b.id === selectedBimesterId);

  const storeKey = `${classId}_${selectedBimesterId}`;
  const plan = plansByClassAndBimester[storeKey];

  const fetchPlan = useCallback(async () => {
    if (!classId || !selectedBimesterId) return;

    if (plansByClassAndBimester[storeKey]) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await httpAdapter.get<ClassPlanDto>("/class-plans", {
        params: { classId, bimesterId: selectedBimesterId },
      });

      if (response.data) {
        const domainPlan = mapClassPlanDtoToDomain(response.data);
        setPlan(classId, selectedBimesterId, domainPlan);
      }
    } catch (err: any) {
      console.error("Error fetching class plan:", err);
      setError(err?.message || "Erro ao carregar o plano de aula");
    } finally {
      setIsLoading(false);
    }
  }, [
    classId,
    selectedBimesterId,
    storeKey,
    plansByClassAndBimester,
    httpAdapter,
    setPlan,
  ]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const subject = currentClass?.subject || "";
  const schoolName = currentSchool?.name || "";
  const className = currentClass?.name || "";

  const bimesterLabel = activeBimester ? activeBimester.title : "";
  const themeText = plan?.theme || "";

  const lessons: Lesson[] = plan?.lessons || [];

  return {
    subject,
    schoolName,
    className,
    themeText,
    lessons,
    isLoading,
    error,
    refetch: fetchPlan,
  };
}
