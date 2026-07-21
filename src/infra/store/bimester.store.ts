import { create } from "zustand";
import { Bimester } from "@/src/features/bimester/types/bimester.types";

const MOCK_BIMESTERS: Bimester[] = [
  {
    id: "1",
    title: "1º Bim",
    status: "done",
    progress: {
      classesTaught: 125,
      totalClasses: 125,
      percentage: 100,
      classesCount: 4,
      subjectsCount: 3,
      performancePercentage: 85,
    },
  },
  {
    id: "2",
    title: "2º Bim",
    status: "done",
    progress: {
      classesTaught: 125,
      totalClasses: 125,
      percentage: 100,
      classesCount: 4,
      subjectsCount: 3,
      performancePercentage: 82,
    },
  },
  {
    id: "3",
    title: "3º Bim",
    status: "in_progress",
    progress: {
      classesTaught: 75,
      totalClasses: 125,
      percentage: 60,
      classesCount: 4,
      subjectsCount: 3,
      performancePercentage: 80,
    },
  },
  {
    id: "4",
    title: "4º Bim",
    status: "locked",
    progress: {
      classesTaught: 0,
      totalClasses: 125,
      percentage: 0,
      classesCount: 4,
      subjectsCount: 3,
      performancePercentage: 0,
    },
  },
];

interface BimesterStoreState {
  bimesters: Bimester[];
  selectedBimesterId: string | null;
  selectBimester: (id: string) => void;
  completeBimester: (id: string) => void;
}

export const useBimesterStore = create<BimesterStoreState>((set) => ({
  bimesters: MOCK_BIMESTERS,
  selectedBimesterId: "3", // Initially select the in_progress bimester
  selectBimester: (id) => set({ selectedBimesterId: id }),
  completeBimester: (id) =>
    set((state) => {
      const updatedBimesters = state.bimesters.map((bimester, index) => {
        if (bimester.id === id) {
          return {
            ...bimester,
            status: "done",
            progress: { ...bimester.progress, percentage: 100, classesTaught: bimester.progress.totalClasses },
          } as Bimester;
        }
        // Unlock next bimester
        if (state.bimesters[index - 1]?.id === id && bimester.status === "locked") {
            return {
                ...bimester,
                status: "in_progress",
            } as Bimester;
        }
        return bimester;
      });

      return { bimesters: updatedBimesters };
    }),
}));
