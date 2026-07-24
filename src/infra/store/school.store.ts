import { create } from "zustand";
import { SchoolStoreState } from "../../common/ports/school.store.port";

export const useSchoolStore = create<SchoolStoreState>((set, get) => ({
  schools: [], // initially empty
  selectedSchoolId: null,
  setSchools: (schools) =>
    set({
      schools,
      selectedSchoolId: get().selectedSchoolId || schools[0]?.id || null,
    }),
  selectSchool: (id) => set({ selectedSchoolId: id }),
  addSchoolOptimistic: (school) => {
    const previousSchools = get().schools;
    set((state) => ({
      schools: [...state.schools, school],
    }));
    return previousSchools;
  },
  rollbackSchool: (snapshot) => set({ schools: snapshot }),
  incrementClassCount: (schoolId) =>
    set((state) => ({
      schools: state.schools.map((school) =>
        school.id === schoolId
          ? { ...school, classCount: school.classCount + 1 }
          : school,
      ),
    })),
}));
