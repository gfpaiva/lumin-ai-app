import { ScreenBackground } from "@/src/components/ui/screen-background";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <ScreenBackground>
      <View className="flex-1 items-center justify-center p-6">
        <View className="bg-card p-6 rounded-2xl border border-surface-neutral w-full max-w-sm">
          <Text className="font-sans font-bold text-2xl text-foreground mb-2">
            lumin.ai
          </Text>
          <Text className="font-sans text-base text-white/70 mb-4">
            Fundação do Design System configurada com sucesso.
          </Text>
          <View className="bg-surface-dark p-4 rounded-xl border border-surface-neutral">
            <Text className="font-sans text-sm text-foreground font-medium">
              Tema base escuro & Fonte Inter carregados.
            </Text>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}
