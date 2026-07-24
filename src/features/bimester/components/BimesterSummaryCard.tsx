import { Text, View } from "react-native";
import { Bimester } from "../types/bimester.types";

interface BimesterSummaryCardProps {
  bimester: Bimester;
}

export function BimesterSummaryCard({ bimester }: BimesterSummaryCardProps) {
  const { progress } = bimester;

  return (
    <View className="mt-4 mb-2">
      {/* Conteúdo Lecionado */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-white text-base font-semibold mb-1">
            Conteúdo lecionado
          </Text>
          <Text className="text-muted-foreground text-sm">
            {progress.totalLessons} temas totais
          </Text>
        </View>
        <Text className="text-white text-base font-bold">
          {(progress.percentage * 100).toFixed(2)}%
        </Text>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-surface-neutral/30 w-full mb-6" />

      {/* Rendimento das Turmas */}
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-muted-foreground text-sm">
            {progress.classesCount} turmas
          </Text>
        </View>
      </View>
    </View>
  );
}
