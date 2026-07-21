import { useEffect, useState } from 'react';
import { useClassStore } from '../../../infra/store/class.store';
import { useSchoolStore } from '../../../infra/store/school.store';
import type {
  EducationLevel,
  EngagementProfile,
  LearningFormat,
} from '../types/class.types';

export type ClassFormStep = 1 | 2;

interface ClassFormData {
  name: string;
  subject: string;
  educationLevel: EducationLevel;
  engagementProfile: EngagementProfile;
  learningFormat: LearningFormat;
}

const DEFAULT_FORM_DATA: ClassFormData = {
  name: '',
  subject: '',
  educationLevel: 'Fundamental',
  engagementProfile: 'Participativa',
  learningFormat: 'Visual',
};

export function useClassFormViewModel(isOpen: boolean) {
  const [step, setStep] = useState<ClassFormStep>(1);
  const [formData, setFormData] = useState<ClassFormData>(DEFAULT_FORM_DATA);

  const { addClass } = useClassStore();
  const { selectedSchoolId } = useSchoolStore();

  // Reset form when bottom sheet closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setFormData(DEFAULT_FORM_DATA);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleContinue = () => {
    setStep(2);
  };

  const handleSave = (onClose: () => void) => {
    if (!selectedSchoolId) return;

    addClass({
      name: formData.name,
      subject: formData.subject,
      educationLevel: formData.educationLevel,
      engagementProfile: formData.engagementProfile,
      learningFormat: formData.learningFormat,
      schoolId: selectedSchoolId,
    });

    onClose();
  };

  const setField = <K extends keyof ClassFormData>(
    key: K,
    value: ClassFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    step,
    formData,
    setField,
    handleContinue,
    handleSave,
  };
}
