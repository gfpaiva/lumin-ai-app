import { View, Text, ScrollView } from "react-native";
import { Pressable } from "@/src/components/ui/pressable";
import { Icon, ChevronRightIcon, CheckIcon } from "@/src/components/ui/icon";
import { School } from "../types/school.types";
import { Button } from "@/src/components/button";

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
  return (
    <View className="flex-1 px-4 mt-4">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {schools.map((school, index) => {
          const isSelected = school.id === selectedSchoolId;
          
          return (
            <View key={school.id}>
              <Pressable
                disabled={isSelected}
                onPress={() => onSelectSchool(school.id)}
                className={`flex-row justify-between items-center py-4`}
              >
                <View>
                  <Text className="text-white text-base font-semibold mb-1">
                    {school.name}
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    {school.turmasCount} {school.turmasCount === 1 ? 'turma' : 'turmas'}
                  </Text>
                </View>
                {isSelected && (
                  <Icon as={CheckIcon} className="text-muted-foreground w-5 h-5" />
                )}
              </Pressable>
              <View className="h-[1px] bg-surface-neutral/30 w-full" />
            </View>
          );
        })}
      </ScrollView>

      <View className="mt-4 mb-6">
        <Button onPress={onNewSchool}>
          <Text className="text-white text-base font-medium mr-2">Cadastrar escola</Text>
          <Icon as={ChevronRightIcon} size="sm" className="text-white" />
        </Button>
      </View>
    </View>
  );
}
