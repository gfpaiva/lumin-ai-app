import { ClassPlan } from "@/src/features/lesson/types/lesson.types";
import {
  Class,
  EducationLevel,
  EngagementProfile,
  LearningFormat,
} from "../types/class.types";

export interface CreateClassParams {
  name: string;
  subject: string;
  educationLevel: EducationLevel;
  engagementProfile: EngagementProfile;
  learningFormat: LearningFormat;
  schoolId: string;
}

export interface GetClassPlanParams {
  classId: string;
  bimesterId: string;
}

export interface ClassServicePort {
  getClassesBySchoolId(schoolId: string): Promise<Class[]>;
  createClass(params: CreateClassParams): Promise<Class>;
  getClassPlan(params: GetClassPlanParams): Promise<ClassPlan>;
}
