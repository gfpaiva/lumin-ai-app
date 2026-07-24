import { BimesterStorePort } from "@/common/ports/bimester.store.port";
import { ClassStorePort } from "@/src/common/ports/class.store.port";
import { SchoolStorePort } from "@/src/common/ports/school.store.port";
import { ClassApiService } from "@/src/features/class/api/class.service";
import { ClassServicePort } from "@/src/features/class/api/class.service.port";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useClassStore } from "@/src/infra/store/class.store";
import { useSchoolStore } from "@/src/infra/store/school.store";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

const defaultClassService = new ClassApiService();

export function useHomeViewModel(
  schoolStore: SchoolStorePort = useSchoolStore,
  classStore: ClassStorePort = useClassStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  classService: ClassServicePort = defaultClassService,
) {
  const router = useRouter();
  const [isClassSheetOpen, setIsClassSheetOpen] = useState(false);
  const [isBimesterSheetOpen, setIsBimesterSheetOpen] = useState(false);
  const [isSchoolSheetOpen, setIsSchoolSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);

  const schools = schoolStore((state) => state.schools);
  const selectedSchoolId = schoolStore((state) => state.selectedSchoolId);
  const classes = classStore((state) => state.classes);
  const fetchedSchoolIds = classStore((state) => state.fetchedSchoolIds);
  const appendClasses = classStore((state) => state.appendClasses);
  const markSchoolAsFetched = classStore((state) => state.markSchoolAsFetched);
  const bimesters = bimesterStore((state) => state.bimesters);
  const selectedBimesterId = bimesterStore((state) => state.selectedBimesterId);

  const hasSchools = schools.length > 0;

  const bimesterTitle = useMemo(() => {
    const selectedBimester = bimesters.find((b) => b.id === selectedBimesterId);
    return selectedBimester
      ? `${selectedBimester.title} ${selectedBimester.year}`
      : "Selecionar bimestre";
  }, [bimesters, selectedBimesterId]);

  useEffect(() => {
    if (selectedSchoolId && !fetchedSchoolIds.includes(selectedSchoolId)) {
      setIsFetchingClasses(true);
      classService
        .getClassesBySchoolId(selectedSchoolId)
        .then((data) => {
          if (data) {
            appendClasses(data);
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
    classService,
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
    hasSchools,
  };
}
