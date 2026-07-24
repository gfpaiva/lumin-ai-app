export type EducationLevel = "Fundamental" | "Médio";

export type EngagementProfile = "Participativa" | "Focada" | "Apática";

export type LearningFormat = "Visual" | "Manual" | "Teórico";

export interface Class {
  id: string;
  name: string;
  subject: string;
  educationLevel: EducationLevel;
  engagementProfile: EngagementProfile;
  learningFormat: LearningFormat;
  schoolId: string;
}
