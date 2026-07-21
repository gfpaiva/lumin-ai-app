import { useLocalSearchParams } from "expo-router";
import { ClassDetailFeature } from "@/src/features/class/components/ClassDetailFeature";

export default function ClassDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ClassDetailFeature classId={id} />;
}
