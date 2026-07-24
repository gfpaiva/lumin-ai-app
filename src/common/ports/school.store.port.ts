import { School } from "../../features/school/types/school.types";

export interface SchoolStoreState {
  schools: School[];
  selectedSchoolId: string | null;
  setSchools: (schools: School[]) => void;
  selectSchool: (id: string) => void;
  addSchoolOptimistic: (school: School) => School[];
  rollbackSchool: (snapshot: School[]) => void;
  incrementClassCount: (schoolId: string) => void;
}

export type SchoolStorePort = <U>(
  selector: (state: SchoolStoreState) => U,
) => U;
