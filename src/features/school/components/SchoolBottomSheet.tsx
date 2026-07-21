import React from "react";
import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { SchoolListView } from "./SchoolListView";
import { SchoolFormView } from "./SchoolFormView";
import { useSchoolViewModel } from "../hooks/useSchoolViewModel";

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

  const title = activeView === 'list' ? 'Escolas' : 'Cadastrar escola';

  return (
    <GenericBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      {activeView === 'list' ? (
        <SchoolListView
          schools={schools}
          selectedSchoolId={selectedSchoolId}
          onSelectSchool={(id) => handleSelectSchool(id, onClose)}
          onNewSchool={() => setActiveView('form')}
        />
      ) : (
        <SchoolFormView onSave={handleSaveSchool} />
      )}
    </GenericBottomSheet>
  );
}
