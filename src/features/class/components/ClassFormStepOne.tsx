import { Button } from '@/src/components/button';
import { FormInput } from '@/src/components/form-input';
import { ChevronRightIcon, Icon } from '@/src/components/ui/icon';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

interface ClassFormStepOneProps {
  name: string;
  subject: string;
  onNameChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onContinue: () => void;
}

export function ClassFormStepOne({
  name,
  subject,
  onNameChange,
  onSubjectChange,
  onContinue,
}: ClassFormStepOneProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-4">
          <FormInput
            label="Nome"
            value={name}
            onChangeText={onNameChange}
            placeholder="Ex: 2º Ano A"
          />

          <FormInput
            label="Disciplina"
            value={subject}
            onChangeText={onSubjectChange}
            placeholder="Ex: História"
            className="mt-6"
          />

          <View className="mt-12 mb-6">
            <Button onPress={onContinue}>
              <Text className="text-white text-base font-medium mr-2">
                Continuar
              </Text>
              <Icon
                as={ChevronRightIcon}
                size="sm"
                className="text-white"
              />
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
