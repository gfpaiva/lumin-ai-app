import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { HttpPort } from "@/src/common/ports/http.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useCallback, useMemo, useState } from "react";

const defaultHttpAdapter = new FetchAdapter();

export function useBimesterSelectorViewModel(
  bimesterStore: BimesterStorePort = useBimesterStore,
  httpAdapter: HttpPort = defaultHttpAdapter,
) {
  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);
  const selectBimester = bimesterStore((state) => state.selectBimester);
  const [isCompleting, setIsCompleting] = useState(false);
  const completeBimester = bimesterStore((state) => state.completeBimester);

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
        await httpAdapter.patch(`/bimesters/${id}/status`, { status: "done" });
        completeBimester(id);
      } catch (error) {
        console.error("Failed to complete bimester", error);
      } finally {
        setIsCompleting(false);
      }
    },
    [completeBimester, httpAdapter],
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
