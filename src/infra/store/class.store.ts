import { create } from 'zustand';
import { ClassStoreState } from '../../common/ports/class.store.port';

export const useClassStore = create<ClassStoreState>((set, get) => ({
  classes: [],
  fetchedSchoolIds: [],
  setClasses: (classes) => set({ classes }),
  appendClasses: (newClasses) => set((state) => ({ 
    classes: [...state.classes, ...newClasses] 
  })),
  markSchoolAsFetched: (schoolId) => set((state) => ({
    fetchedSchoolIds: [...new Set([...state.fetchedSchoolIds, schoolId])]
  })),
  addClassOptimistic: (cls) => {
    const previousClasses = get().classes;
    set((state) => ({
      classes: [...state.classes, cls],
    }));
    return previousClasses;
  },
  rollbackClass: (snapshot) => set({ classes: snapshot }),
}));
