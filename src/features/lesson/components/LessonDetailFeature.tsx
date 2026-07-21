import { Button } from "@/src/components/button";
import { GenericBottomSheet } from "@/src/components/generic-bottom-sheet";
import { LayoutHeader } from "@/src/components/layout-header";
import { ScreenBackground } from "@/src/components/screen-background";
import { Pressable } from "@/src/components/ui/pressable";
import { Tag } from "@/src/components/ui/tag";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLessonDetailViewModel } from "../hooks/useLessonDetailViewModel";

interface LessonDetailFeatureProps {
  lessonId: string;
}

export function LessonDetailFeature({ lessonId }: LessonDetailFeatureProps) {
  const {
    lesson,
    localActivities,
    classLevel,
    isEditing,
    toggleEditMode,
    saveChanges,
    toggleActivityCompletion,
    removeActivity,
  } = useLessonDetailViewModel(lessonId);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  if (!lesson) {
    return (
      <ScreenBackground>
        <Text className="text-foreground p-4">Aula não encontrada.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LayoutHeader
          subtitle={`Aula ${lesson.lessonNumber}`}
          title={lesson.title}
        />

        {lesson.aiSuggestions && (
          <Tag variant="neutral" size="md" className="mb-6 self-start">
            {isEditing ? "Modo edição 👀" : "Sugestões geradas com IA ✨"}
          </Tag>
        )}

        {lesson.duration && (
          <View className="mb-8">
            <Text className="text-foreground text-lg font-medium mb-3">
              Tempo de aula para o tema
            </Text>
            <Tag variant="primary" size="lg" className="mb-3">
              {lesson.duration}
            </Tag>
            <Text className="text-muted-foreground text-sm text-center">
              Baseado em um nível {classLevel} de turma
            </Text>
          </View>
        )}

        {localActivities && localActivities.length > 0 && (
          <View className="flex-1">
            <Text className="text-foreground text-xl font-bold mb-4">
              Exercícios
            </Text>

            {localActivities.map((activity) => (
              <View
                key={activity.id}
                className="mb-4 pt-4 border-t border-t-surface-neutral"
              >
                <Text className="text-foreground font-bold text-lg mb-2">
                  {activity.title}
                </Text>
                <Text className="text-muted-foreground mb-4">
                  {activity.description}
                </Text>

                <View className="flex-row gap-3">
                  {!isEditing ? (
                    <Pressable
                      onPress={() => toggleActivityCompletion(activity.id)}
                      className={`flex-row items-center border rounded-full py-2 px-4 self-start ${activity.completed ? "border-primary bg-primary/20" : "border-surface-neutral bg-transparent"}`}
                    >
                      <Text
                        className={`font-medium mr-2 ${activity.completed ? "text-primary" : "text-foreground"}`}
                      >
                        Concluir
                      </Text>
                      <Check
                        size={16}
                        color={activity.completed ? "#3b82f6" : "#fff"}
                      />
                    </Pressable>
                  ) : (
                    <>
                      <Pressable
                        onPress={() => setIsBottomSheetOpen(true)}
                        className="flex-row items-center border border-surface-neutral bg-transparent rounded-full py-2 px-4 self-start"
                      >
                        <Text className="text-foreground font-medium">
                          Recalibrar exercício ✨
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => removeActivity(activity.id)}
                        className="flex-row items-center border border-surface-neutral bg-transparent rounded-full py-2 px-4 self-start"
                      >
                        <Text className="text-foreground font-medium mr-2">
                          Excluir
                        </Text>
                        <X size={16} color="#fff" />
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View className="pt-4 pb-2">
        <Button onPress={isEditing ? saveChanges : toggleEditMode}>
          <Text className="text-foreground font-medium text-lg">
            {isEditing ? "Salvar alterações" : "Customizar ✨"}
          </Text>
        </Button>
      </View>

      <GenericBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title="Recalibrar Exercício"
      >
        <Text className="text-muted-foreground">
          [Placeholder] Aqui ficarão as opções para recalibrar o exercício com a
          IA.
        </Text>
      </GenericBottomSheet>
    </ScreenBackground>
  );
}
