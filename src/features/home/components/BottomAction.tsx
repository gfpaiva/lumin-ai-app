import { Button } from "@/src/components/button";
import { ChevronRightIcon, Icon } from "@/src/components/ui/icon";
import { Text, View } from "react-native";

interface BottomActionProps {
  onPress?: () => void;
}

export function BottomAction({ onPress }: BottomActionProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 pb-10 bg-transparent">
      <Button onPress={onPress}>
        <Text className="text-foreground font-medium text-base mr-2">
          Cadastrar nova turma
        </Text>
        <Icon
          as={ChevronRightIcon}
          size="sm"
          className="text-muted-foreground"
        />
      </Button>
    </View>
  );
}
