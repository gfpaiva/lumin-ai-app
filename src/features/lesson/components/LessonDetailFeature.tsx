import { Button } from "@/src/components/button";
import { LayoutHeader } from "@/src/components/layout-header";
import { ScreenBackground } from "@/src/components/screen-background";
import { Tag } from "@/src/components/ui/tag";
import { ScrollView, Text, View } from "react-native";
import { useLessonDetailViewModel } from "../hooks/useLessonDetailViewModel";

interface LessonDetailFeatureProps {
  lessonId: string;
}

export function LessonDetailFeature({ lessonId }: LessonDetailFeatureProps) {
  const { lesson, classLevel } = useLessonDetailViewModel(lessonId);

  if (!lesson) {
    return (
      <ScreenBackground>
        <Text className="text-foreground p-4">Aula não encontrada.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <View className="flex-1">
        <LayoutHeader
          subtitle={`Aula ${lesson.lessonNumber}`}
          title={lesson.title}
        />

        {lesson.aiSuggestions && (
          <Tag variant="neutral" size="md" className="mb-6">
            Sugestões geradas com IA ✨
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

        {lesson.activities && lesson.activities.length > 0 && (
          <View className="flex-1">
            <Text className="text-foreground text-xl font-bold mb-4">
              Exercícios
            </Text>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {lesson.activities.map((activity) => (
                <View
                  key={activity.id}
                  className="mb-4 pt-4 border-t-2 border-t-surface-neutral"
                >
                  <Text className="text-foreground font-bold text-lg mb-2">
                    {activity.title}
                  </Text>
                  <Text className="text-muted-foreground">
                    {activity.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View className="pt-4 pb-2">
        <Button onPress={() => {}}>
          <Text className="text-foreground font-medium text-lg">
            Customizar ✨
          </Text>
        </Button>
      </View>
    </ScreenBackground>
  );
}
