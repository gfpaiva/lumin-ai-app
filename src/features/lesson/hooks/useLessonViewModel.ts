import { useLessonStore } from "@/src/infra/store/lesson.store";
import { Activity, ClassPlan, Lesson } from "../types/lesson.types";

export type { Activity, ClassPlan, Lesson };

/**
 * @deprecated Use useLessonStore or specific ViewModels (useClassDetailViewModel, useLessonDetailViewModel) instead.
 */
export function useLessonViewModel() {
  const plansByClassAndBimester = useLessonStore(
    (state) => state.plansByClassAndBimester,
  );

  const getLessonsByClass = (classId: string, bimesterId = "bimester-1") => {
    const key = `${classId}_${bimesterId}`;
    return plansByClassAndBimester[key]?.lessons || [];
  };

  const getLessonById = (
    id: string,
    classId = "class-1",
    bimesterId = "bimester-1",
  ) => {
    const key = `${classId}_${bimesterId}`;
    const plan = plansByClassAndBimester[key];
    return plan?.lessons.find(
      (l) => l.id === id || String(l.lessonNumber) === String(id),
    );
  };

  return {
    plansByClassAndBimester,
    getLessonsByClass,
    getLessonById,
  };
}
