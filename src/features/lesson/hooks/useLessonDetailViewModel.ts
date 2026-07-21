import { useLessonViewModel } from "./useLessonViewModel";

export function useLessonDetailViewModel(lessonId: string) {
  const { getLessonById } = useLessonViewModel();
  const lesson = getLessonById(lessonId);

  // Mocks based on UI design
  return {
    lesson,
    classLevel: "Avançado",
  };
}
