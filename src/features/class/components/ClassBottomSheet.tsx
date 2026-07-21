import React from 'react';
import { GenericBottomSheet } from '@/src/components/generic-bottom-sheet';
import { useClassFormViewModel } from '../hooks/useClassFormViewModel';
import { ClassFormStepOne } from './ClassFormStepOne';
import { ClassFormStepTwo } from './ClassFormStepTwo';

interface ClassBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClassBottomSheet({ isOpen, onClose }: ClassBottomSheetProps) {
  const { step, formData, setField, handleContinue, handleSave } =
    useClassFormViewModel(isOpen);

  return (
    <GenericBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar turma"
    >
      {step === 1 ? (
        <ClassFormStepOne
          name={formData.name}
          subject={formData.subject}
          onNameChange={(v) => setField('name', v)}
          onSubjectChange={(v) => setField('subject', v)}
          onContinue={handleContinue}
        />
      ) : (
        <ClassFormStepTwo
          educationLevel={formData.educationLevel}
          engagementProfile={formData.engagementProfile}
          learningFormat={formData.learningFormat}
          onEducationLevelChange={(v) => setField('educationLevel', v)}
          onEngagementProfileChange={(v) => setField('engagementProfile', v)}
          onLearningFormatChange={(v) => setField('learningFormat', v)}
          onSave={() => handleSave(onClose)}
        />
      )}
    </GenericBottomSheet>
  );
}
