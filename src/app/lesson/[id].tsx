import { LessonDetailFeature } from "@/src/features/lesson/components/LessonDetailFeature";
import { useLocalSearchParams } from "expo-router";

export default function LessonDetailScreen() {
  const { id, classId } = useLocalSearchParams<{ id: string; classId?: string }>();

  return <LessonDetailFeature lessonId={id} classId={classId} />;
}
