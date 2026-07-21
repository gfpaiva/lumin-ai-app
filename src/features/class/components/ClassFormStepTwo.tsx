import { Button } from '@/src/components/button';
import { ChipRadioGroup } from '@/src/components/chip-radio-group';
import { ScrollView, Text, View } from 'react-native';
import type { EngagementProfile, LearningFormat, EducationLevel } from '../types/class.types';

const EDUCATION_LEVEL_OPTIONS: Array<{ value: EducationLevel; label: string }> = [
  { value: 'Fundamental', label: 'Fundamental' },
  { value: 'Médio', label: 'Médio' },
];

const ENGAGEMENT_PROFILE_OPTIONS: Array<{ value: EngagementProfile; label: string }> = [
  { value: 'Participativa', label: 'Participativa' },
  { value: 'Focada', label: 'Focada' },
  { value: 'Apática', label: 'Apática' },
];

const LEARNING_FORMAT_OPTIONS: Array<{ value: LearningFormat; label: string }> = [
  { value: 'Visual', label: 'Visual' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Teórico', label: 'Teórico' },
];

interface ClassFormStepTwoProps {
  educationLevel: EducationLevel;
  engagementProfile: EngagementProfile;
  learningFormat: LearningFormat;
  onEducationLevelChange: (value: EducationLevel) => void;
  onEngagementProfileChange: (value: EngagementProfile) => void;
  onLearningFormatChange: (value: LearningFormat) => void;
  onSave: () => void;
}

export function ClassFormStepTwo({
  educationLevel,
  engagementProfile,
  learningFormat,
  onEducationLevelChange,
  onEngagementProfileChange,
  onLearningFormatChange,
  onSave,
}: ClassFormStepTwoProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="mt-4">
        <ChipRadioGroup
          label="Ensino"
          options={EDUCATION_LEVEL_OPTIONS}
          selectedValue={educationLevel}
          onValueChange={(v) => onEducationLevelChange(v as EducationLevel)}
        />

        <ChipRadioGroup
          label="Perfil de engajamento da turma"
          options={ENGAGEMENT_PROFILE_OPTIONS}
          selectedValue={engagementProfile}
          onValueChange={(v) => onEngagementProfileChange(v as EngagementProfile)}
          className="mt-6"
        />

        <ChipRadioGroup
          label="Formato de aprendizado predominante"
          options={LEARNING_FORMAT_OPTIONS}
          selectedValue={learningFormat}
          onValueChange={(v) => onLearningFormatChange(v as LearningFormat)}
          className="mt-6"
        />

        <View className="mt-12 mb-6">
          <Button onPress={onSave}>
            <Text className="text-white text-base font-medium">Salvar</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
