import { Button } from "@/src/components/button";
import { ChipRadioGroup } from "@/src/components/chip-radio-group";
import { FormInput } from "@/src/components/form-input";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const CATEGORY_OPTIONS = [
  { value: "Escola Estadual", label: "Escola Estadual" },
  { value: "Escola Municipal", label: "Escola Municipal" },
];

interface SchoolFormViewProps {
  onSave: (data: { name: string; category: string; workload?: string }) => void;
}

export function SchoolFormView({ onSave }: SchoolFormViewProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Escola Estadual");
  const [workload] = useState("16 horas");

  const handleSave = () => {
    onSave({ name, category, workload });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-4">
          <FormInput
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Ex: EE Mário Covas"
          />

          <ChipRadioGroup
            label="Categoria"
            options={CATEGORY_OPTIONS}
            selectedValue={category}
            onValueChange={setCategory}
            className="mt-6 border-b-[1px] border-b-surface-neutral/30 pb-4"
          />

          <View className="mt-12 mb-6">
            <Button onPress={handleSave}>
              <Text className="text-white text-base font-medium">Salvar</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
