import { Box } from "@/src/components/ui/box";
import { Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";

interface HeroHeaderProps {
  subtitle: string;
  title: string;
  onTitlePress?: () => void;
  rightIcon?: any;
}

export function HeroHeader({ subtitle, title, onTitlePress, rightIcon }: HeroHeaderProps) {
  return (
    <Box className="mb-6">
      <Text className="text-muted-foreground text-lg font-medium mb-1">
        {subtitle}
      </Text>
      <Pressable onPress={onTitlePress} className="flex-row items-center gap-2">
        <Text className="text-foreground text-3xl font-bold">
          {title}
        </Text>
        {rightIcon && (
          <Icon
            as={rightIcon}
            size="md"
            className="text-foreground mt-1"
          />
        )}
      </Pressable>
    </Box>
  );
}
