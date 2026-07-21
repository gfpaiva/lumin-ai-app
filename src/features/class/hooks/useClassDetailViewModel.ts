import { useLessonViewModel } from "@/src/features/lesson/hooks/useLessonViewModel";

export function useClassDetailViewModel(classId: string) {
  const { getLessonsByClass } = useLessonViewModel();
  const lessons = getLessonsByClass(classId);

  return {
    subject: "História",
    schoolName: "EE Mário Covas",
    className: "2º Ano Ensino Médio",
    bimesterSummary:
      "Conteúdo 3º Bimestre: Revoluções e transformações do mundo moderno",
    lessons,
  };
}
