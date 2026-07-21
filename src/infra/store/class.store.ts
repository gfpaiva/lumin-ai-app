import { create } from 'zustand';
import { Class } from '../../features/class/types/class.types';

export interface ClassState {
  classes: Class[];
  addClass: (cls: Omit<Class, 'id'>) => void;
}

const MOCK_CLASSES: Class[] = [
  {
    id: '1',
    name: '2º Ano A',
    subject: 'História',
    educationLevel: 'Médio',
    engagementProfile: 'Participativa',
    learningFormat: 'Visual',
    schoolId: '1',
  },
  {
    id: '2',
    name: '1º Ano B',
    subject: 'Geografia',
    educationLevel: 'Médio',
    engagementProfile: 'Focada',
    learningFormat: 'Teórico',
    schoolId: '1',
  },
  {
    id: '3',
    name: '9º Ano C',
    subject: 'Geografia',
    educationLevel: 'Fundamental',
    engagementProfile: 'Apática',
    learningFormat: 'Manual',
    schoolId: '2',
  },
];

export const useClassStore = create<ClassState>((set) => ({
  classes: MOCK_CLASSES,
  addClass: (cls) =>
    set((state) => ({
      classes: [
        ...state.classes,
        { ...cls, id: String(Date.now()) },
      ],
    })),
}));
