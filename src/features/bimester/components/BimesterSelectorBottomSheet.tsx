import { Button } from "@/src/components/button";
import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { ChevronRight } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useBimesterSelectorViewModel } from "../hooks/useBimesterSelectorViewModel";
import { BimesterChip } from "./BimesterChip";
import { BimesterSummaryCard } from "./BimesterSummaryCard";

interface BimesterSelectorBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export function BimesterSelectorBottomSheet({
  isOpen,
  onClose,
  onLoadingChange,
}: BimesterSelectorBottomSheetProps) {
  const {
    bimesters,
    selectedBimesterId,
    selectedBimester,
    isSelectedBimesterCurrent,
    isCompleting,
    onSelectBimester,
    onCompleteBimester,
  } = useBimesterSelectorViewModel();

  useEffect(() => {
    onLoadingChange?.(isCompleting);
  }, [isCompleting, onLoadingChange]);

  if (!selectedBimester) return null;

  return (
    <GenericBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Selecione o bimestre"
    >
      <View>
        {/* Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          <View className="flex-row gap-3 pr-8">
            {bimesters.map((b) => (
              <BimesterChip
                key={b.id}
                title={b.title}
                status={b.status}
                isSelected={b.id === selectedBimesterId}
                onPress={() => onSelectBimester(b.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="h-[1px] bg-surface-neutral/50 w-full mb-4" />

        {/* Resumo */}
        <BimesterSummaryCard bimester={selectedBimester} />

        {/* Botão Concluir */}
        {isSelectedBimesterCurrent && (
          <View className="mt-8">
            <Button
              onPress={() => {
                onCompleteBimester(selectedBimester.id);
              }}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-white font-medium text-base">
                  Concluir bimestre
                </Text>
                <ChevronRight size={18} color="#FFFFFF" />
              </View>
            </Button>
          </View>
        )}
      </View>
    </GenericBottomSheet>
  );
}
