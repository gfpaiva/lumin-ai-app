import { Button } from "@/src/components/button";
import { LayoutHeader } from "@/src/components/layout-header";
import { ScreenBackground } from "@/src/components/screen-background";
import { Pressable } from "@/src/components/ui/pressable";
import { Tag } from "@/src/components/ui/tag";
import { Check, Clock, X } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useLessonDetailViewModel } from "../hooks/useLessonDetailViewModel";
import { RecalibrateBottomSheet } from "./RecalibrateBottomSheet";

interface LessonDetailFeatureProps {
  lessonId: string;
  classId?: string;
}

export function LessonDetailFeature({
  lessonId,
  classId,
}: LessonDetailFeatureProps) {
  const {
    lesson,
    localActivities,
    isEditing,
    toggleEditMode,
    saveChanges,
    toggleActivityCompletion,
    removeActivity,
    recalibrateActivity,
    isRecalibrating,
    isLoading,
  } = useLessonDetailViewModel(lessonId, classId);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );

  const handleOpenRecalibrate = (activityId: string) => {
    setSelectedActivityId(activityId);
    setIsBottomSheetOpen(true);
  };

  const handleCloseRecalibrate = () => {
    setIsBottomSheetOpen(false);
    setSelectedActivityId(null);
  };

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isRecalibrating ? 0 : 1, { duration: 300 }),
    };
  });

  if (isLoading && !lesson) {
    return (
      <ScreenBackground>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </ScreenBackground>
    );
  }

  if (!lesson) {
    return (
      <ScreenBackground>
        <Text className="text-foreground p-4">Aula não encontrada.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground isLoading={isRecalibrating}>
      <Animated.View style={[{ flex: 1 }, contentStyle]}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <LayoutHeader
            subtitle={`Tema ${lesson.lessonNumber}`}
            title={lesson.title}
          />

          {Boolean(lesson.aiSuggestions) && (
            <View className="mb-6">
              <Tag
                variant="neutral"
                size="md"
                className={`self-start ${
                  typeof lesson.aiSuggestions === "string" &&
                  lesson.aiSuggestions.trim().length > 0
                    ? "mb-2"
                    : ""
                }`}
              >
                {isEditing ? "Modo edição 👀" : "Sugestões geradas com IA ✨"}
              </Tag>
              {typeof lesson.aiSuggestions === "string" &&
                lesson.aiSuggestions.trim().length > 0 && (
                  <Text className="text-muted-foreground text-sm">
                    {lesson.aiSuggestions}
                  </Text>
                )}
            </View>
          )}

          {lesson.duration && (
            <View className="mb-8">
              <Text className="text-foreground text-lg font-medium mb-3">
                Tempo de aula para o tema
              </Text>
              <Tag variant="primary" size="lg" className="mb-3">
                {lesson.duration} minutos
              </Tag>
              <Text className="text-muted-foreground text-sm text-center">
                Baseado nos parâmetros de nível de ensino, perfil de engajamento
                e formato de aprendizagem da turma.
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

                  <View className="flex-row items-center justify-between gap-3 flex-wrap">
                    <View className="flex-row items-center gap-3 flex-wrap">
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
                            onPress={() => handleOpenRecalibrate(activity.id)}
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

                    {Boolean(activity.duration) && (
                      <View className="flex-row items-center gap-1.5">
                        <Clock size={16} color="#9CA3AF" />
                        <Text className="text-muted-foreground text-sm font-medium">
                          {activity.duration} min
                        </Text>
                      </View>
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
      </Animated.View>

      <RecalibrateBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseRecalibrate}
        activityId={selectedActivityId}
        onRecalibrate={recalibrateActivity}
        isRecalibrating={isRecalibrating}
      />
    </ScreenBackground>
  );
}
