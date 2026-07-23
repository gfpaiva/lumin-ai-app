import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { useEffect } from "react";
import { useSchoolViewModel, ViewState } from "../hooks/useSchoolViewModel";
import { SchoolFormView } from "./SchoolFormView";
import { SchoolListView } from "./SchoolListView";

interface SchoolBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatingSchoolChange?: (isCreating: boolean) => void;
  initialView?: ViewState;
}

export function SchoolBottomSheet({
  isOpen,
  onClose,
  onCreatingSchoolChange,
  initialView = "list",
}: SchoolBottomSheetProps) {
  const {
    schools,
    classes,
    selectedSchoolId,
    activeView,
    setActiveView,
    isCreatingSchool,
    handleSelectSchool,
    handleSaveSchool,
  } = useSchoolViewModel(isOpen, initialView);

  const title = activeView === "list" ? "Escolas" : "Cadastrar escola";

  useEffect(() => {
    onCreatingSchoolChange?.(isCreatingSchool);
  }, [isCreatingSchool, onCreatingSchoolChange]);

  return (
    <GenericBottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      {activeView === "list" ? (
        <SchoolListView
          schools={schools}
          selectedSchoolId={selectedSchoolId}
          onSelectSchool={(id) => handleSelectSchool(id, onClose)}
          onNewSchool={() => setActiveView("form")}
        />
      ) : (
        <SchoolFormView onSave={(data) => handleSaveSchool(data, onClose)} />
      )}
    </GenericBottomSheet>
  );
}
