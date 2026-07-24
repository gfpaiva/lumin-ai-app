import { Activity, ClassPlan, Lesson } from "../../features/lesson/types/lesson.types";

export interface LessonStoreState {
  plansByClassAndBimester: Record<string, ClassPlan>;
  setPlan: (classId: string, bimesterId: string, plan: ClassPlan) => void;
  getPlan: (classId: string, bimesterId: string) => ClassPlan | undefined;
  hasPlan: (classId: string, bimesterId: string) => boolean;
  updateActivityCompletionOptimistic: (
    classId: string,
    bimesterId: string,
    lessonIdentifier: string,
    activityId: string,
    completed?: boolean,
  ) => void;
  updateActivityInLesson: (
    classId: string,
    bimesterId: string,
    lessonIdentifier: string,
    activity: Activity,
  ) => void;
  updateLessonOptimistic: (
    classId: string,
    bimesterId: string,
    lessonIdentifier: string,
    updatedLesson: Partial<Lesson>,
  ) => void;
  rollbackPlan: (
    classId: string,
    bimesterId: string,
    snapshot: ClassPlan,
  ) => void;
}

export type LessonStorePort = <U>(selector: (state: LessonStoreState) => U) => U;

