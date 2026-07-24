import { HttpPort } from "@/src/common/ports/http.port";
import { mapClassPlanDtoToDomain } from "@/src/features/lesson/mappers/class-plan.mapper";
import {
  ClassPlan,
  ClassPlanDto,
} from "@/src/features/lesson/types/lesson.types";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { Class } from "../types/class.types";
import {
  ClassServicePort,
  CreateClassParams,
  GetClassPlanParams,
} from "./class.service.port";

export class ClassApiService implements ClassServicePort {
  constructor(private readonly httpAdapter: HttpPort = new FetchAdapter()) {}

  async getClassesBySchoolId(schoolId: string): Promise<Class[]> {
    const { data } = await this.httpAdapter.get<Class[]>(
      `/classes?schoolId=${schoolId}`,
    );
    return data || [];
  }

  async createClass(params: CreateClassParams): Promise<Class> {
    const { data } = await this.httpAdapter.post<Class>("/classes", params);
    return data;
  }

  async getClassPlan(params: GetClassPlanParams): Promise<ClassPlan> {
    const { data } = await this.httpAdapter.get<ClassPlanDto>("/class-plans", {
      params: { classId: params.classId, bimesterId: params.bimesterId },
    });
    return mapClassPlanDtoToDomain(data);
  }
}
