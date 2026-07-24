import { School } from "../types/school.types";

export interface CreateSchoolParams {
  name: string;
  category: string;
  workload?: string;
}

export interface SchoolServicePort {
  createSchool(params: CreateSchoolParams): Promise<School>;
}
