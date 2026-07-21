import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { ScreenBackground } from "@/src/components/screen-background";
import {
  ChevronRightIcon,
  Icon,
} from "@/src/components/ui/icon";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useClassDetailViewModel } from "../hooks/useClassDetailViewModel";
import { LessonCard } from "./LessonCard";

import { LayoutHeader } from "@/src/components/layout-header";

interface ClassDetailFeatureProps {
  classId: string;
}

export function ClassDetailFeature({ classId }: ClassDetailFeatureProps) {
  const router = useRouter();
  const [isClassSheetOpen, setIsClassSheetOpen] = useState(false);

  const { subject, schoolName, className, bimesterSummary, lessons } =
    useClassDetailViewModel(classId);

  return (
    <ScreenBackground>
      <View className="flex-1">
        <LayoutHeader
          subtitle={`${subject} • ${schoolName}`}
          title={className}
          rightIcon={ChevronRightIcon}
          onTitlePress={() => setIsClassSheetOpen(true)}
        />

        <Text className="text-foreground text-xl font-medium mb-8 leading-snug">
          {bimesterSummary}
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between pb-8">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lessonNumber={lesson.lessonNumber}
                title={lesson.title}
                progressPercentage={lesson.progressPercentage}
                onPress={() => router.push(`/lesson/${lesson.id}`)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <GenericBottomSheet
        isOpen={isClassSheetOpen}
        onClose={() => setIsClassSheetOpen(false)}
        title="Turma"
      >
        <Text className="text-foreground p-4">
          Conteúdo placeholder para detalhes da turma.
        </Text>
      </GenericBottomSheet>
    </ScreenBackground>
  );
}
