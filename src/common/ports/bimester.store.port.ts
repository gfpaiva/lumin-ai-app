import { Bimester } from "@/src/features/bimester/types/bimester.types";

export interface BimesterStoreState {
  bimesters: Bimester[];
  selectedBimesterId: string | null;
  setBimesters: (bimesters: Bimester[]) => void;
  selectBimester: (id: string) => void;
  completeBimester: (id: string) => void;
}

export type BimesterStorePort = <U>(
  selector: (state: BimesterStoreState) => U,
) => U;
