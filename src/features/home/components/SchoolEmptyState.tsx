import { Button } from "@/src/components/button";
import { EmptyState } from "@/src/components/empty-state";
import { ChevronRightIcon, Icon } from "@/src/components/ui/icon";
import { School } from "lucide-react-native";
import { Text } from "react-native";

export interface SchoolEmptyStateProps {
  onAddSchool: () => void;
}

export function SchoolEmptyState({ onAddSchool }: SchoolEmptyStateProps) {
  return (
    <EmptyState
      icon={School}
      title="Nenhuma escola"
      description="Cadastre sua primeira escola para começar a organizar suas turmas."
    >
      <Button onPress={onAddSchool}>
        <Text className="text-white text-base font-medium mr-2">
          Cadastrar escola
        </Text>
        <Icon as={ChevronRightIcon} size="sm" className="text-white" />
      </Button>
    </EmptyState>
  );
}
