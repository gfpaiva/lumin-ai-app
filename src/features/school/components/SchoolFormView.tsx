import { Button } from "@/src/components/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/src/components/ui/form-control";
import { CircleIcon } from "@/src/components/ui/icon";
import { Input, InputField } from "@/src/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/src/components/ui/radio";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

interface SchoolFormViewProps {
  onSave: (data: { name: string; category: string; workload?: string }) => void;
}

export function SchoolFormView({ onSave }: SchoolFormViewProps) {
  const [name, setName] = useState("EE Mário Covas");
  const [category, setCategory] = useState("Escola Estadual");
  const [workload, setWorkload] = useState("16 horas");

  const handleSave = () => {
    onSave({ name, category, workload });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-4 flex-1">
          {/* Nome */}
          <FormControl>
            <FormControlLabel className="mb-0">
              <FormControlLabelText className="text-muted-foreground text-sm">
                Nome
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="border-t-0 border-l-0 border-r-0 border-b-[1px] border-b-surface-neutral/30 rounded-none p-2 mt-2 h-auto min-h-0 bg-transparent">
              <InputField
                value={name}
                onChangeText={setName}
                placeholder="Ex: EE Mário Covas"
                className="text-white text-xl font-semibold px-0 py-2 h-auto leading-[1.2] bg-transparent"
                placeholderTextColor="#666"
              />
            </Input>
          </FormControl>

          {/* Categoria */}
          <FormControl className="mt-6">
            <FormControlLabel className="mb-2">
              <FormControlLabelText className="text-muted-foreground text-sm">
                Categoria
              </FormControlLabelText>
            </FormControlLabel>

            <RadioGroup
              value={category}
              onChange={setCategory}
              className="flex-col gap-3 border-t-0 border-l-0 border-r-0 border-b-[1px] border-b-surface-neutral/30 pb-3"
            >
              <Radio value="Escola Estadual" size="md">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel className="text-white text-lg font-semibold ml-2">
                  Escola Estadual
                </RadioLabel>
              </Radio>
              <Radio value="Escola Municipal" size="md">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel className="text-white text-lg font-semibold ml-2">
                  Escola Municipal
                </RadioLabel>
              </Radio>
            </RadioGroup>
          </FormControl>

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
