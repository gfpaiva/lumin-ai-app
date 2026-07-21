import { Box } from "@/src/components/ui/box";
import { ChevronRightIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";

interface HomeWelcomeProps {
  username: string;
  currentPeriod: string;
  onPeriodPress?: () => void;
}

export function HomeWelcome({ username, currentPeriod, onPeriodPress }: HomeWelcomeProps) {
  return (
    <Box className="mb-6">
      <Text className="text-muted-foreground text-lg font-medium mb-1">
        Olá, {username}!
      </Text>
      <Pressable onPress={onPeriodPress} className="flex-row items-center gap-2">
        <Text className="text-foreground text-3xl font-bold">
          {currentPeriod}
        </Text>
        <Icon
          as={ChevronRightIcon}
          size="md"
          className="text-foreground mt-1"
        />
      </Pressable>
    </Box>
  );
}
