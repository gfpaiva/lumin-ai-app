import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useMemo } from "react";

export function useBimesterSelectorViewModel() {
  const bimesters = useBimesterStore((state) => state.bimesters);
  const selectedBimesterId = useBimesterStore((state) => state.selectedBimesterId);
  const selectBimester = useBimesterStore((state) => state.selectBimester);
  const completeBimester = useBimesterStore((state) => state.completeBimester);

  const selectedBimester = useMemo(
    () => bimesters.find((b) => b.id === selectedBimesterId),
    [bimesters, selectedBimesterId]
  );

  const currentBimester = useMemo(
    () => bimesters.find((b) => b.status === "in_progress"),
    [bimesters]
  );

  const isSelectedBimesterCurrent =
    selectedBimesterId === currentBimester?.id;

  return {
    bimesters,
    selectedBimesterId,
    selectedBimester,
    currentBimester,
    isSelectedBimesterCurrent,
    onSelectBimester: selectBimester,
    onCompleteBimester: completeBimester,
  };
}
