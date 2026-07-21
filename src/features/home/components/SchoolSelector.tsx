import { Box } from "@/src/components/ui/box";
import { ChevronDownIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";

interface SchoolSelectorProps {
  selectedSchoolName: string;
  onPress: () => void;
}

export function SchoolSelector({ selectedSchoolName, onPress }: SchoolSelectorProps) {
  return (
    <Box className="mb-6">
      <Pressable
        onPress={onPress}
        className="flex-row items-center self-start bg-card rounded-full px-6 py-4 gap-2 border border-surface-neutral/25"
      >
        <Text className="text-foreground font-medium text-base">
          {selectedSchoolName}
        </Text>
        <Icon
          as={ChevronDownIcon}
          size="sm"
          className="text-muted-foreground"
        />
      </Pressable>
    </Box>
  );
}
