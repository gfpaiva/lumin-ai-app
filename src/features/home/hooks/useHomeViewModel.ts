import { BimesterStorePort } from "@/common/ports/bimester.store.port";
import { ClassStorePort } from "@/src/common/ports/class.store.port";
import { HttpPort } from "@/src/common/ports/http.port";
import { SchoolStorePort } from "@/src/common/ports/school.store.port";
import { FetchAdapter } from "@/src/infra/http/fetch.adapter";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useClassStore } from "@/src/infra/store/class.store";
import { useSchoolStore } from "@/src/infra/store/school.store";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import type { Class } from "../../class/types/class.types";

const defaultHttpAdapter = new FetchAdapter();

export function useHomeViewModel(
  schoolStore: SchoolStorePort = useSchoolStore,
  classStore: ClassStorePort = useClassStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  httpAdapter: HttpPort = defaultHttpAdapter,
) {
  const router = useRouter();
  const [isClassSheetOpen, setIsClassSheetOpen] = useState(false);
  const [isBimesterSheetOpen, setIsBimesterSheetOpen] = useState(false);
  const [isSchoolSheetOpen, setIsSchoolSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);

  const selectedSchoolId = schoolStore((state) => state.selectedSchoolId);
  const classes = classStore((state) => state.classes);
  const fetchedSchoolIds = classStore((state) => state.fetchedSchoolIds);
  const appendClasses = classStore((state) => state.appendClasses);
  const markSchoolAsFetched = classStore((state) => state.markSchoolAsFetched);
  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);

  const bimesterTitle = useMemo(() => {
    const selectedBimester = bimesters.find((b) => b.id === selectedBimesterId);
    return selectedBimester
      ? `${selectedBimester.title} ${selectedBimester.year}`
      : "Selecionar bimestre";
  }, [bimesters, selectedBimesterId]);

  useEffect(() => {
    if (selectedSchoolId && !fetchedSchoolIds.includes(selectedSchoolId)) {
      setIsFetchingClasses(true);
      httpAdapter
        .get<Class[]>(`/classes?schoolId=${selectedSchoolId}`)
        .then((res) => {
          if (res.data) {
            appendClasses(res.data);
            markSchoolAsFetched(selectedSchoolId);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch classes for school:", err);
        })
        .finally(() => {
          setIsFetchingClasses(false);
        });
    }
  }, [
    selectedSchoolId,
    fetchedSchoolIds,
    appendClasses,
    markSchoolAsFetched,
    httpAdapter,
  ]);

  const filteredClasses = classes.filter(
    (cls) => cls.schoolId === selectedSchoolId,
  );

  return {
    router,
    isClassSheetOpen,
    setIsClassSheetOpen,
    isBimesterSheetOpen,
    setIsBimesterSheetOpen,
    isSchoolSheetOpen,
    setIsSchoolSheetOpen,
    isLoading,
    setIsLoading,
    isCreatingSchool,
    setIsCreatingSchool,
    isFetchingClasses,
    filteredClasses,
    bimesterTitle,
  };
}
