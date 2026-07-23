import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";

export interface LessonCardProps {
  lessonNumber: number;
  title: string;
  progressPercentage: number;
  onPress?: () => void;
}

export function LessonCard({
  lessonNumber,
  title,
  progressPercentage,
  onPress,
}: LessonCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-transparent border-2 border-surface-neutral/50 rounded-2xl p-5 mb-4 w-[48%] items-center justify-between min-h-[200px]"
    >
      <Text className="text-muted-foreground text-lg font-medium mb-3">
        Tema {lessonNumber}
      </Text>
      <Text
        className="text-foreground text-lg font-medium text-center leading-snug flex-1 flex-col justify-center mt-2"
        numberOfLines={4}
      >
        {title}
      </Text>
      <Text className="text-foreground text-lg font-bold mt-4">
        {progressPercentage}%
      </Text>
    </Pressable>
  );
}
