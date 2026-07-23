import { EmptyState } from "@/src/components/empty-state";
import { BookDashed } from "lucide-react-native";

export function ClassEmptyState() {
  return (
    <EmptyState
      icon={BookDashed}
      title="Nenhuma turma"
      description="Cadastre sua primeira turma para começar a organizar suas aulas."
    />
  );
}
