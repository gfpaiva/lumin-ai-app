import { create } from 'zustand';
import { School } from '../../features/school/types/school.types';

export interface SchoolState {
  schools: School[];
  selectedSchoolId: string | null;
  selectSchool: (id: string) => void;
  addSchool: (school: Omit<School, 'id'>) => void;
}

const MOCK_SCHOOLS: School[] = [
  { id: '1', name: 'EE Mário Covas', category: 'Escola Estadual', turmasCount: 3 },
  { id: '2', name: 'EE Mário Xis', category: 'Escola Estadual', turmasCount: 2 },
];

export const useSchoolStore = create<SchoolState>((set) => ({
  schools: MOCK_SCHOOLS,
  selectedSchoolId: '1',
  selectSchool: (id) => set({ selectedSchoolId: id }),
  addSchool: (school) => set((state) => ({
    schools: [
      ...state.schools,
      { ...school, id: String(Date.now()) }
    ]
  })),
}));
