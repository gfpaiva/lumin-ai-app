import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { useEffect } from "react";
import { useSchoolViewModel } from "../hooks/useSchoolViewModel";
import { SchoolFormView } from "./SchoolFormView";
import { SchoolListView } from "./SchoolListView";

interface SchoolBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatingSchoolChange?: (isCreating: boolean) => void;
}

export function SchoolBottomSheet({
  isOpen,
  onClose,
  onCreatingSchoolChange,
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
  } = useSchoolViewModel(isOpen);

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
