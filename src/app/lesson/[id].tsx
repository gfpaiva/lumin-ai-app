import { LessonDetailFeature } from "@/src/features/lesson/components/LessonDetailFeature";
import { useLocalSearchParams } from "expo-router";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <LessonDetailFeature lessonId={id} />;
}
