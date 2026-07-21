import { useEffect, useState } from 'react';
import { useSchoolStore } from '../../../infra/store/school.store';

export type ViewState = 'list' | 'form';

export function useSchoolViewModel(isOpen: boolean) {
  const [activeView, setActiveView] = useState<ViewState>('list');
  const { schools, selectedSchoolId, selectSchool, addSchool } = useSchoolStore();

  const selectedSchool = schools.find((s) => s.id === selectedSchoolId);

  // Reset to 'list' view when sheet closes
  useEffect(() => {
    if (!isOpen) {
      // Pequeno timeout para não dar glitch visual fechando o form
      const timer = setTimeout(() => {
        setActiveView('list');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectSchool = (id: string, onClose: () => void) => {
    selectSchool(id);
    onClose();
  };

  const handleSaveSchool = (
    data: { name: string; category: string; workload?: string },
    onClose: () => void,
  ) => {
    addSchool({
      name: data.name,
      category: data.category,
      turmasCount: 0,
    });

    // Select the newly created school (it gets a Date.now() id — fetch it after add)
    // We use the store's getState to grab the latest list synchronously
    const { schools: updatedSchools } = useSchoolStore.getState();
    const newSchool = updatedSchools[updatedSchools.length - 1];
    if (newSchool) {
      selectSchool(newSchool.id);
    }

    onClose();
  };

  return {
    schools,
    selectedSchoolId,
    selectedSchool,
    activeView,
    setActiveView,
    handleSelectSchool,
    handleSaveSchool,
  };
}
