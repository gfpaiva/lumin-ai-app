import { Bimester } from "../types/bimester.types";

export interface BimesterServicePort {
  getBimesters(): Promise<Bimester[]>;
  completeBimester(id: string): Promise<Bimester[]>;
}
