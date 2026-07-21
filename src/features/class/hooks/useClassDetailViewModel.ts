import { useState } from "react";

export function useClassDetailViewModel(classId: string) {
  // Mock data for now based on the reference design
  const [lessons] = useState([
    {
      id: "1",
      lessonNumber: 1,
      title: "O mundo antes das revoluções",
      progressPercentage: 100,
    },
    {
      id: "2",
      lessonNumber: 2,
      title: "Iluminismo: novas ideias, novos direitos",
      progressPercentage: 67,
    },
    {
      id: "3",
      lessonNumber: 3,
      title: "Revolução Inglesa e a limitação do poder real",
      progressPercentage: 0,
    },
    {
      id: "4",
      lessonNumber: 4,
      title: "Revolução Industrial: máquinas, fábricas e trabalho",
      progressPercentage: 0,
    },
  ]);

  return {
    subject: "História",
    schoolName: "EE Mário Covas",
    className: "2º Ano Ensino Médio",
    bimesterSummary:
      "Conteúdo 3º Bimestre: Revoluções e transformações do mundo moderno",
    lessons,
  };
}
