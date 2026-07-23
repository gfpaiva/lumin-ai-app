export interface Activity {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  duration?: number;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  progressPercentage: number;
  classId?: string;
  duration?: string;
  aiSuggestions?: string;
  activities?: Activity[];
}

export interface ClassPlan {
  id: string;
  classId: string;
  bimesterId: string;
  theme: string;
  lessons: Lesson[];
}

export interface ActivityDto {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  duration?: number;
}

export interface LessonDto {
  id: string;
  lessonNumber: number;
  title: string;
  progressPercentage?: number;
  duration?: string;
  aiSuggestions?: string;
  activities?: ActivityDto[];
}

export interface ClassPlanDto {
  id: string;
  classId: string;
  bimesterId: string;
  theme: string;
  lessons: LessonDto[];
}

