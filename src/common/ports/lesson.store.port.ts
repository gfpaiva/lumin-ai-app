import { ClassPlan } from "../../features/lesson/types/lesson.types";

export interface LessonStoreState {
  plansByClassAndBimester: Record<string, ClassPlan>;
  setPlan: (classId: string, bimesterId: string, plan: ClassPlan) => void;
  getPlan: (classId: string, bimesterId: string) => ClassPlan | undefined;
  hasPlan: (classId: string, bimesterId: string) => boolean;
}

export type LessonStorePort = <U>(selector: (state: LessonStoreState) => U) => U;
