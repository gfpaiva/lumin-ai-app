import { HttpPort } from "@/src/common/ports/http.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import {
  mapActivityDtoToDomain,
  mapClassPlanDtoToDomain,
  mapLessonDomainToDto,
} from "../mappers/class-plan.mapper";
import {
  Activity,
  ActivityDto,
  ClassPlan,
  ClassPlanDto,
} from "../types/lesson.types";
import {
  GetClassPlanParams,
  LessonServicePort,
  RecalibrateActivityParams,
  SaveLessonParams,
  ToggleActivityCompletionParams,
} from "./lesson.service.port";

export class LessonApiService implements LessonServicePort {
  constructor(private readonly httpAdapter: HttpPort = new FetchAdapter()) {}

  async getClassPlan(params: GetClassPlanParams): Promise<ClassPlan> {
    const response = await this.httpAdapter.get<ClassPlanDto>("/class-plans", {
      params: { classId: params.classId, bimesterId: params.bimesterId },
    });
    return mapClassPlanDtoToDomain(response.data);
  }

  async toggleActivityCompletion(
    params: ToggleActivityCompletionParams,
  ): Promise<ClassPlan> {
    const response = await this.httpAdapter.patch<ClassPlanDto>(
      `/class-plans/${params.planId}/lessons/${params.lessonNumber}/activities/${params.activityId}`,
      { completed: params.completed },
    );
    return mapClassPlanDtoToDomain(response.data);
  }

  async recalibrateActivity(
    params: RecalibrateActivityParams,
  ): Promise<Activity> {
    const response = await this.httpAdapter.post<ActivityDto>(
      `/class-plans/${params.planId}/lessons/${params.lessonNumber}/activities/${params.activityId}/recalibrate`,
      {
        emphasis: params.emphasis,
        complexity: params.complexity,
        observations: params.observations,
      },
    );
    return mapActivityDtoToDomain(response.data);
  }

  async saveLesson(params: SaveLessonParams): Promise<ClassPlan> {
    const payload = mapLessonDomainToDto(params.lesson);
    const response = await this.httpAdapter.put<ClassPlanDto>(
      `/class-plans/${params.planId}/lessons/${params.lessonNumber}`,
      payload,
    );
    return mapClassPlanDtoToDomain(response.data);
  }
}
