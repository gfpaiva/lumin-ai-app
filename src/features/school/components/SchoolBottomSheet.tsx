import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { useSchoolViewModel } from "../hooks/useSchoolViewModel";
import { SchoolFormView } from "./SchoolFormView";
import { SchoolListView } from "./SchoolListView";

interface SchoolBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchoolBottomSheet({ isOpen, onClose }: SchoolBottomSheetProps) {
  const {
    schools,
    selectedSchoolId,
    activeView,
    setActiveView,
    handleSelectSchool,
    handleSaveSchool,
  } = useSchoolViewModel(isOpen);

  const title = activeView === "list" ? "Escolas" : "Cadastrar escola";

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
