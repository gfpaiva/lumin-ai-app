import { useCallback, useEffect, useState } from "react";
import { ClassStorePort } from "../../../common/ports/class.store.port";
import { SchoolStorePort } from "../../../common/ports/school.store.port";
import { useClassStore } from "../../../infra/store/class.store";
import { useSchoolStore } from "../../../infra/store/school.store";
import { SchoolApiService } from "../api/school.service";
import { SchoolServicePort } from "../api/school.service.port";

export type ViewState = "list" | "form";

const defaultSchoolService = new SchoolApiService();

export function useSchoolViewModel(
  isOpen: boolean,
  initialView: ViewState = "list",
  schoolStore: SchoolStorePort = useSchoolStore,
  classStore: ClassStorePort = useClassStore,
  schoolService: SchoolServicePort = defaultSchoolService,
) {
  const [activeView, setActiveView] = useState<ViewState>(initialView);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const schools = schoolStore((state) => state.schools);
  const setSchools = schoolStore((state) => state.setSchools);
  const selectedSchoolId = schoolStore((state) => state.selectedSchoolId);
  const selectSchool = schoolStore((state) => state.selectSchool);

  const classes = classStore((state) => state.classes);

  const selectedSchool = schools.find((s) => s.id === selectedSchoolId);

  // Set activeView to initialView when sheet opens, reset to 'list' view when sheet closes
  useEffect(() => {
    if (isOpen) {
      setActiveView(initialView);
    } else {
      const timer = setTimeout(() => {
        setActiveView("list");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialView]);

  const handleSelectSchool = (id: string, onClose: () => void) => {
    selectSchool(id);
    onClose();
  };

  const handleSaveSchool = useCallback(
    async (
      data: { name: string; category: string; workload?: string },
      onClose: () => void,
    ) => {
      setIsCreatingSchool(true);

      try {
        const newSchool = await schoolService.createSchool({
          name: data.name,
          category: data.category,
          workload: data.workload,
        });
        setSchools([...schools, newSchool]);
        selectSchool(newSchool.id);
        onClose();
      } catch (error) {
        console.error("Failed to add school", error);
      } finally {
        setIsCreatingSchool(false);
      }
    },
    [schools, setSchools, selectSchool, schoolService],
  );

  return {
    schools,
    classes,
    selectedSchoolId,
    selectedSchool,
    activeView,
    setActiveView,
    isCreatingSchool,
    handleSelectSchool,
    handleSaveSchool,
  };
}
