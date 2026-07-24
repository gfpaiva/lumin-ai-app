import { Activity, ClassPlan, Lesson } from "../types/lesson.types";

export interface GetClassPlanParams {
  classId: string;
  bimesterId: string;
}

export interface ToggleActivityCompletionParams {
  planId: string;
  lessonNumber: number | string;
  activityId: string;
  completed: boolean;
}

export interface RecalibrateActivityParams {
  planId: string;
  lessonNumber: number | string;
  activityId: string;
  emphasis: "alta" | "media" | "baixa";
  complexity: "diminuir" | "manter" | "aumentar";
  observations: string;
}

export interface SaveLessonParams {
  planId: string;
  lessonNumber: number | string;
  lesson: Lesson;
}

export interface LessonServicePort {
  getClassPlan(params: GetClassPlanParams): Promise<ClassPlan>;
  toggleActivityCompletion(
    params: ToggleActivityCompletionParams,
  ): Promise<ClassPlan>;
  recalibrateActivity(params: RecalibrateActivityParams): Promise<Activity>;
  saveLesson(params: SaveLessonParams): Promise<ClassPlan>;
}
