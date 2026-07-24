import { HttpPort } from "@/src/common/ports/http.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { School } from "../types/school.types";
import { CreateSchoolParams, SchoolServicePort } from "./school.service.port";

export class SchoolApiService implements SchoolServicePort {
  constructor(private readonly httpAdapter: HttpPort = new FetchAdapter()) {}

  async createSchool(params: CreateSchoolParams): Promise<School> {
    const { data } = await this.httpAdapter.post<School>("/schools", {
      name: params.name,
      category: params.category,
    });
    return data;
  }
}
