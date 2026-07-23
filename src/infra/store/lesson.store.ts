import { create } from "zustand";
import { LessonStoreState } from "../../common/ports/lesson.store.port";

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
}));
