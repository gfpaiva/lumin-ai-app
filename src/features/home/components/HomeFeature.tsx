import { Header } from "@/src/components/header";
import { ScreenBackground } from "@/src/components/screen-background";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { BimesterSelectorBottomSheet } from "../../bimester/components/BimesterSelectorBottomSheet";
import { ClassBottomSheet } from "../../class/components/ClassBottomSheet";
import { SchoolBottomSheet } from "../../school/components/SchoolBottomSheet";
import {
  useSchoolViewModel,
  ViewState,
} from "../../school/hooks/useSchoolViewModel";
import { useHomeViewModel } from "../hooks/useHomeViewModel";
import { BottomAction } from "./BottomAction";
import { ClassCard } from "./ClassCard";
import { ClassEmptyState } from "./ClassEmptyState";
import { HomeSkeleton } from "./HomeSkeleton";
import { HomeWelcome } from "./HomeWelcome";
import { SchoolEmptyState } from "./SchoolEmptyState";
import { SchoolSelector } from "./SchoolSelector";

export function HomeFeature() {
  const {
    router,
    isClassSheetOpen,
    setIsClassSheetOpen,
    isBimesterSheetOpen,
    setIsBimesterSheetOpen,
    isSchoolSheetOpen,
    setIsSchoolSheetOpen,
    isLoading,
    setIsLoading,
    isCreatingSchool,
    setIsCreatingSchool,
    isFetchingClasses,
    filteredClasses,
    bimesterTitle,
    hasSchools,
  } = useHomeViewModel();

  const [schoolSheetInitialView, setSchoolSheetInitialView] =
    useState<ViewState>("list");

  const { selectedSchool } = useSchoolViewModel(isSchoolSheetOpen);
  const selectedSchoolName = selectedSchool
    ? selectedSchool.name
    : "Selecionar escola";

  const handleOpenAddSchool = () => {
    setSchoolSheetInitialView("form");
    setIsSchoolSheetOpen(true);
  };

  const handleOpenSchoolSelector = () => {
    setSchoolSheetInitialView("list");
    setIsSchoolSheetOpen(true);
  };

  return (
    <>
      {isCreatingSchool || isFetchingClasses ? (
        <HomeSkeleton />
      ) : (
        <ScreenBackground isLoading={isLoading}>
          <View className="flex-1">
            <Header />

            <HomeWelcome
              username="Prof. Helena"
              currentPeriod={bimesterTitle}
              onPeriodPress={() => setIsBimesterSheetOpen(true)}
            />

            {hasSchools ? (
              <>
                <SchoolSelector
                  selectedSchoolName={selectedSchoolName}
                  onPress={handleOpenSchoolSelector}
                />

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                  <View>
                    {filteredClasses.length === 0 ? (
                      <ClassEmptyState />
                    ) : (
                      filteredClasses.map((cls) => (
                        <ClassCard
                          key={cls.id}
                          id={cls.id}
                          grade={`${cls.name} Ensino ${cls.educationLevel}`}
                          subject={cls.subject}
                          onPress={() => router.push(`/class/${cls.id}`)}
                        />
                      ))
                    )}
                  </View>
                </ScrollView>

                <BottomAction onPress={() => setIsClassSheetOpen(true)} />
              </>
            ) : (
              <SchoolEmptyState onAddSchool={handleOpenAddSchool} />
            )}
          </View>
        </ScreenBackground>
      )}

      <ClassBottomSheet
        isOpen={isClassSheetOpen}
        onClose={() => setIsClassSheetOpen(false)}
        onLoadingChange={setIsLoading}
      />

      <BimesterSelectorBottomSheet
        isOpen={isBimesterSheetOpen}
        onClose={() => setIsBimesterSheetOpen(false)}
        onLoadingChange={setIsLoading}
      />

      <SchoolBottomSheet
        isOpen={isSchoolSheetOpen}
        onClose={() => setIsSchoolSheetOpen(false)}
        onCreatingSchoolChange={setIsCreatingSchool}
        initialView={schoolSheetInitialView}
      />
    </>
  );
}
