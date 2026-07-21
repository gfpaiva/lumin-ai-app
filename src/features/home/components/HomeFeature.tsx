import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { BimesterSelectorBottomSheet } from "../../bimester/components/BimesterSelectorBottomSheet";
import { Header } from "@/src/components/header";
import { ScreenBackground } from "@/src/components/screen-background";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { BottomAction } from "./BottomAction";
import { ClassCard } from "./ClassCard";
import { HomeWelcome } from "./HomeWelcome";
import { SchoolSelector } from "./SchoolSelector";
import { SchoolBottomSheet } from "../../school/components/SchoolBottomSheet";
import { useSchoolViewModel } from "../../school/hooks/useSchoolViewModel";
import { ClassBottomSheet } from "../../class/components/ClassBottomSheet";
import { useClassStore } from "@/src/infra/store/class.store";
import { useSchoolStore } from "@/src/infra/store/school.store";

export function HomeFeature() {
  const [isClassSheetOpen, setIsClassSheetOpen] = useState(false);
  const [isBimesterSheetOpen, setIsBimesterSheetOpen] = useState(false);
  const [isSchoolSheetOpen, setIsSchoolSheetOpen] = useState(false);

  const { selectedSchool } = useSchoolViewModel(isSchoolSheetOpen);
  const selectedSchoolName = selectedSchool ? selectedSchool.name : 'Selecionar escola';

  const { classes } = useClassStore();
  const { selectedSchoolId } = useSchoolStore();

  const filteredClasses = classes.filter(
    (cls) => cls.schoolId === selectedSchoolId,
  );

  return (
    <ScreenBackground>
      <View className="flex-1">
        <Header />

        <HomeWelcome
          username="Prof. Helena"
          currentPeriod="3º Bimestre 2026"
          onPeriodPress={() => setIsBimesterSheetOpen(true)}
        />

        <SchoolSelector
          selectedSchoolName={selectedSchoolName}
          onPress={() => setIsSchoolSheetOpen(true)}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View>
            {filteredClasses.map((cls) => (
              <ClassCard
                key={cls.id}
                id={cls.id}
                grade={`${cls.name} Ensino ${cls.educationLevel}`}
                subject={cls.subject}
                onPress={() => console.log("Navigating to class", cls.id)}
              />
            ))}
          </View>
        </ScrollView>

        <BottomAction onPress={() => setIsClassSheetOpen(true)} />
      </View>

      <ClassBottomSheet
        isOpen={isClassSheetOpen}
        onClose={() => setIsClassSheetOpen(false)}
      />

      <BimesterSelectorBottomSheet
        isOpen={isBimesterSheetOpen}
        onClose={() => setIsBimesterSheetOpen(false)}
      />

      <SchoolBottomSheet
        isOpen={isSchoolSheetOpen}
        onClose={() => setIsSchoolSheetOpen(false)}
      />
    </ScreenBackground>
  );
}
