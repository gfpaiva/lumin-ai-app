import { Button } from "@/src/components/button";
import { ChipOption, ChipRadioGroup } from "@/src/components/chip-radio-group";
import { FormInput } from "@/src/components/form-input";
import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RecalibrateParams } from "../hooks/useLessonDetailViewModel";

interface RecalibrateBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: string | null;
  onRecalibrate: (params: RecalibrateParams) => Promise<void>;
  isRecalibrating?: boolean;
}

const emphasisOptions: ChipOption[] = [
  { label: "Alta", value: "alta" },
  { label: "Média", value: "media" },
  { label: "Baixa", value: "baixa" },
];

const complexityOptions: ChipOption[] = [
  { label: "Diminuir", value: "diminuir" },
  { label: "Manter", value: "manter" },
  { label: "Aumentar", value: "aumentar" },
];

export function RecalibrateBottomSheet({
  isOpen,
  onClose,
  activityId,
  onRecalibrate,
  isRecalibrating = false,
}: RecalibrateBottomSheetProps) {
  const [emphasis, setEmphasis] = useState<"alta" | "media" | "baixa">("alta");
  const [complexity, setComplexity] = useState<
    "diminuir" | "manter" | "aumentar"
  >("diminuir");
  const [observations, setObservations] = useState("");

  // Reset form when opened with a new activity
  useEffect(() => {
    if (isOpen) {
      setEmphasis("alta");
      setComplexity("diminuir");
      setObservations("");
    }
  }, [isOpen, activityId]);

  const handleRecalibrate = () => {
    if (!activityId) return;

    onClose();

    onRecalibrate({
      activityId,
      emphasis,
      complexity,
      observations,
    });
  };

  return (
    <GenericBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Recalibrar Atividade"
    >
      <View className="gap-6 mt-2">
        <ChipRadioGroup
          label="Ênfase"
          options={emphasisOptions}
          selectedValue={emphasis}
          onValueChange={(val) => setEmphasis(val as any)}
        />

        <ChipRadioGroup
          label="Complexidade"
          options={complexityOptions}
          selectedValue={complexity}
          onValueChange={(val) => setComplexity(val as any)}
        />

        <FormInput
          label="Observações"
          value={observations}
          onChangeText={setObservations}
          placeholder="Ex: Focar mais em pronomes..."
          multiline={true}
        />

        <Button onPress={handleRecalibrate} className="mt-4">
          <Text className="text-foreground font-medium text-lg">
            {isRecalibrating ? "Recalibrando..." : "Recalibrar atividade ✨"}
          </Text>
        </Button>
      </View>
    </GenericBottomSheet>
  );
}
