import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { Header } from "@/src/components/header";
import { ScreenBackground } from "@/src/components/screen-background";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BottomAction } from "./BottomAction";
import { ClassCard } from "./ClassCard";
import { HomeWelcome } from "./HomeWelcome";
import { SchoolSelector } from "./SchoolSelector";

const MOCK_CLASSES = [
  { id: "1", grade: "2º Ano Ensino Médio", subject: "História" },
  { id: "2", grade: "1º Ano Ensino Médio", subject: "Geografia" },
  { id: "3", grade: "9º Ano Ensino Fundamental", subject: "Geografia" },
];

export function HomeFeature() {
  const [selectedSchool, setSelectedSchool] = useState("EE Mário Covas");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <ScreenBackground>
      <View className="flex-1">
        <Header />

        <HomeWelcome username="Prof. Helena" currentPeriod="3º Bimestre 2026" />

        <SchoolSelector selectedSchool={selectedSchool} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View>
            {MOCK_CLASSES.map((cls) => (
              <ClassCard
                key={cls.id}
                id={cls.id}
                grade={cls.grade}
                subject={cls.subject}
                onPress={() => console.log("Navigating to class", cls.id)}
              />
            ))}
          </View>
        </ScrollView>

        <BottomAction onPress={() => setIsSheetOpen(true)} />
      </View>

      <GenericBottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Selecione o bimestre"
      >
        <View className="px-2">
          <Text className="text-white text-base">
            Teste de conteúdo do bottom sheet
          </Text>
        </View>
      </GenericBottomSheet>
    </ScreenBackground>
  );
}
