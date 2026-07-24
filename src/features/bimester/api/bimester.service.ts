import { HttpPort } from "@/src/common/ports/http.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { Bimester } from "../types/bimester.types";
import { BimesterServicePort } from "./bimester.service.port";

export class BimesterApiService implements BimesterServicePort {
  constructor(private readonly httpAdapter: HttpPort = new FetchAdapter()) {}

  async getBimesters(): Promise<Bimester[]> {
    const { data } = await this.httpAdapter.get<Bimester[]>("/bimesters");
    return data || [];
  }

  async completeBimester(id: string): Promise<Bimester[]> {
    await this.httpAdapter.patch(`/bimesters/${id}/status`, { status: "done" });
    return await this.getBimesters();
  }
}
