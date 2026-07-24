import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useCallback, useMemo, useState } from "react";
import { BimesterApiService } from "../api/bimester.service";
import { BimesterServicePort } from "../api/bimester.service.port";

const defaultBimesterService = new BimesterApiService();

export function useBimesterSelectorViewModel(
  bimesterStore: BimesterStorePort = useBimesterStore,
  bimesterService: BimesterServicePort = defaultBimesterService,
) {
  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);
  const selectBimester = bimesterStore((state) => state.selectBimester);
  const [isCompleting, setIsCompleting] = useState(false);
  const completeBimester = bimesterStore((state) => state.completeBimester);
  const setBimesters = bimesterStore((state) => state.setBimesters);

  const selectedBimester = useMemo(
    () => bimesters.find((b) => b.id === selectedBimesterId),
    [bimesters, selectedBimesterId],
  );

  const currentBimester = useMemo(
    () => bimesters.find((b) => b.status === "in_progress"),
    [bimesters],
  );

  const isSelectedBimesterCurrent = selectedBimesterId === currentBimester?.id;

  const onCompleteBimester = useCallback(
    async (id: string, onClose?: () => void) => {
      setIsCompleting(true);
      onClose?.();

      try {
        const updatedBimesters = await bimesterService.completeBimester(id);
        completeBimester(id);
        setBimesters(updatedBimesters);
      } catch (error) {
        console.error("Failed to complete bimester", error);
      } finally {
        setIsCompleting(false);
      }
    },
    [completeBimester, setBimesters, bimesterService],
  );

  return {
    bimesters,
    selectedBimesterId,
    selectedBimester,
    currentBimester,
    isSelectedBimesterCurrent,
    isCompleting,
    onSelectBimester: selectBimester,
    onCompleteBimester,
  };
}
