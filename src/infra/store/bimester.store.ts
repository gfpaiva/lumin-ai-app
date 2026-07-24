import { BimesterStoreState } from "@/src/common/ports/bimester.store.port";
import { Bimester } from "@/src/features/bimester/types/bimester.types";
import { create } from "zustand";

export const useBimesterStore = create<BimesterStoreState>((set, get) => ({
  bimesters: [], // starts empty, populated by initialization
  selectedBimesterId: null,
  setBimesters: (bimesters) =>
    set({
      bimesters,
      // Set selected to first in_progress if none selected, or keep current
      selectedBimesterId:
        get().selectedBimesterId ||
        bimesters.find((b) => b.status === "in_progress")?.id ||
        (bimesters[0]?.id ?? null),
    }),
  selectBimester: (id) => set({ selectedBimesterId: id }),
  completeBimester: (id) => {
    set((state) => {
      const updatedBimesters = state.bimesters.map((bimester, index) => {
        if (bimester.id === id) {
          return {
            ...bimester,
            status: "done",
            progress: { ...bimester.progress },
          } as Bimester;
        }
        if (
          state.bimesters[index - 1]?.id === id &&
          bimester.status === "locked"
        ) {
          return { ...bimester, status: "in_progress" } as Bimester;
        }
        return bimester;
      });
      return { bimesters: updatedBimesters };
    });
  },
  completeBimesterOptimistic: (id) => {
    const previousBimesters = get().bimesters;

    set((state) => {
      const updatedBimesters = state.bimesters.map((bimester, index) => {
        if (bimester.id === id) {
          return {
            ...bimester,
            status: "done",
            progress: { ...bimester.progress },
          } as Bimester;
        }
        // Unlock next bimester
        if (
          state.bimesters[index - 1]?.id === id &&
          bimester.status === "locked"
        ) {
          return {
            ...bimester,
            status: "in_progress",
          } as Bimester;
        }
        return bimester;
      });

      return { bimesters: updatedBimesters };
    });

    return previousBimesters;
  },
  rollbackBimester: (snapshot) => set({ bimesters: snapshot }),
}));
