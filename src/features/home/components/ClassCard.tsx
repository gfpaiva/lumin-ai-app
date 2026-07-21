import { ChevronRightIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { Text, View } from "react-native";

export interface ClassCardProps {
  id: string;
  grade: string;
  subject: string;
  onPress?: () => void;
}

export function ClassCard({ grade, subject, onPress }: ClassCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-card rounded-2xl p-6 mb-5 active:opacity-80 border border-surface-neutral/20"
    >
      <View>
        <Text className="text-foreground font-semibold text-lg mb-1">
          {grade}
        </Text>
        <Text className="text-muted-foreground text-base">{subject}</Text>
      </View>
      <Icon as={ChevronRightIcon} size="sm" className="text-muted-foreground" />
    </Pressable>
  );
}
