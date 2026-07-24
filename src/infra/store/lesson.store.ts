import { create } from "zustand";
import { LessonStoreState } from "../../common/ports/lesson.store.port";
import { Activity, Lesson } from "../../features/lesson/types/lesson.types";

export function calculateTotalLessonDuration(activities?: Activity[]): string {
  if (!activities || activities.length === 0) return "0";
  const total = activities.reduce((sum, act) => sum + (act.duration || 0), 0);
  return String(total);
}

function matchesLesson(lesson: Lesson, identifier: string): boolean {
  return (
    lesson.id === identifier ||
    String(lesson.lessonNumber) === String(identifier)
  );
}

export const useLessonStore = create<LessonStoreState>((set, get) => ({
  plansByClassAndBimester: {},
  setPlan: (classId, bimesterId, plan) => {
    const key = `${classId}_${bimesterId}`;
    set((state) => ({
      plansByClassAndBimester: {
        ...state.plansByClassAndBimester,
        [key]: plan,
      },
    }));
  },
  getPlan: (classId, bimesterId) => {
    const key = `${classId}_${bimesterId}`;
    return get().plansByClassAndBimester[key];
  },
  hasPlan: (classId, bimesterId) => {
    const key = `${classId}_${bimesterId}`;
    return Boolean(get().plansByClassAndBimester[key]);
  },
  updateActivityCompletionOptimistic: (
    classId,
    bimesterId,
    lessonIdentifier,
    activityId,
    completed,
  ) => {
    const key = `${classId}_${bimesterId}`;
    const plan = get().plansByClassAndBimester[key];
    if (!plan) return;

    const updatedLessons = plan.lessons.map((lesson) => {
      if (!matchesLesson(lesson, lessonIdentifier)) return lesson;
      const updatedActivities = (lesson.activities || []).map((act) =>
        act.id === activityId
          ? {
              ...act,
              completed: completed !== undefined ? completed : !act.completed,
            }
          : act,
      );
      return {
        ...lesson,
        activities: updatedActivities,
      };
    });

    set((state) => ({
      plansByClassAndBimester: {
        ...state.plansByClassAndBimester,
        [key]: { ...plan, lessons: updatedLessons },
      },
    }));
  },
  updateActivityInLesson: (classId, bimesterId, lessonIdentifier, activity) => {
    const key = `${classId}_${bimesterId}`;
    const plan = get().plansByClassAndBimester[key];
    if (!plan) return;

    const updatedLessons = plan.lessons.map((lesson) => {
      if (!matchesLesson(lesson, lessonIdentifier)) return lesson;
      const updatedActivities = (lesson.activities || []).map((act) =>
        act.id === activity.id ? activity : act,
      );
      const newDuration = calculateTotalLessonDuration(updatedActivities);
      return {
        ...lesson,
        activities: updatedActivities,
        duration: newDuration,
      };
    });

    set((state) => ({
      plansByClassAndBimester: {
        ...state.plansByClassAndBimester,
        [key]: { ...plan, lessons: updatedLessons },
      },
    }));
  },
  updateLessonOptimistic: (
    classId,
    bimesterId,
    lessonIdentifier,
    updatedLesson,
  ) => {
    const key = `${classId}_${bimesterId}`;
    const plan = get().plansByClassAndBimester[key];
    if (!plan) return;

    const updatedLessons = plan.lessons.map((lesson) => {
      if (!matchesLesson(lesson, lessonIdentifier)) return lesson;
      const mergedActivities = updatedLesson.activities ?? lesson.activities;
      const newDuration = updatedLesson.activities
        ? calculateTotalLessonDuration(mergedActivities)
        : (updatedLesson.duration ?? lesson.duration);

      return {
        ...lesson,
        ...updatedLesson,
        activities: mergedActivities,
        duration: newDuration,
      };
    });

    set((state) => ({
      plansByClassAndBimester: {
        ...state.plansByClassAndBimester,
        [key]: { ...plan, lessons: updatedLessons },
      },
    }));
  },
  rollbackPlan: (classId, bimesterId, snapshot) => {
    const key = `${classId}_${bimesterId}`;
    set((state) => ({
      plansByClassAndBimester: {
        ...state.plansByClassAndBimester,
        [key]: snapshot,
      },
    }));
  },
}));
