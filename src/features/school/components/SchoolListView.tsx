import { Button } from "@/src/components/button";
import { CheckIcon, ChevronRightIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { useClassStore } from "@/src/infra/store/class.store";
import { ScrollView, Text, View } from "react-native";
import { School } from "../types/school.types";

interface SchoolListViewProps {
  schools: School[];
  selectedSchoolId: string | null;
  onSelectSchool: (id: string) => void;
  onNewSchool: () => void;
}

export function SchoolListView({
  schools,
  selectedSchoolId,
  onSelectSchool,
  onNewSchool,
}: SchoolListViewProps) {
  const { classes } = useClassStore();

  return (
    <View className="mt-4">
      {/* Lista com scroll — não ocupa espaço do botão */}
      <ScrollView
        className="max-h-80"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        {schools.map((school) => {
          const isSelected = school.id === selectedSchoolId;
          const classCount = classes.filter(
            (c) => c.schoolId === school.id,
          ).length;

          return (
            <View key={school.id}>
              <Pressable
                disabled={isSelected}
                onPress={() => onSelectSchool(school.id)}
                className="flex-row justify-between items-center py-4"
              >
                <View>
                  <Text className="text-white text-base font-semibold mb-1">
                    {school.name}
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    {classCount} {classCount === 1 ? "turma" : "turmas"}
                  </Text>
                </View>
                {isSelected && (
                  <Icon
                    as={CheckIcon}
                    className="text-muted-foreground w-5 h-5"
                  />
                )}
              </Pressable>
              <View className="h-[1px] bg-surface-neutral/30 w-full" />
            </View>
          );
        })}
      </ScrollView>

      {/* Botão fixo no rodapé — sempre visível independente do tamanho da lista */}
      <View className="mt-4 mb-6">
        <Button onPress={onNewSchool}>
          <Text className="text-white text-base font-medium mr-2">
            Cadastrar escola
          </Text>
          <Icon as={ChevronRightIcon} size="sm" className="text-white" />
        </Button>
      </View>
    </View>
  );
}
