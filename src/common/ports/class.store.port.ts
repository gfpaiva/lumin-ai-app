import { Class } from '../../features/class/types/class.types';

export interface ClassStoreState {
  classes: Class[];
  fetchedSchoolIds: string[];
  setClasses: (classes: Class[]) => void;
  appendClasses: (classes: Class[]) => void;
  markSchoolAsFetched: (schoolId: string) => void;
  addClassOptimistic: (cls: Class) => Class[];
  rollbackClass: (snapshot: Class[]) => void;
}

export type ClassStorePort = <U>(selector: (state: ClassStoreState) => U) => U;
