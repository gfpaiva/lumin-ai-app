import { useState } from "react";

export interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  progressPercentage: number;
  classId?: string;
  duration?: string;
  aiSuggestions?: boolean;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    lessonNumber: 1,
    title: "O mundo antes das revoluções",
    progressPercentage: 100,
    classId: "class-1",
    duration: "4 dias",
    aiSuggestions: true,
    activities: [
      {
        id: "act-1",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-2",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-3",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-4",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-5",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
    ],
  },
  {
    id: "2",
    lessonNumber: 2,
    title: "Iluminismo: novas ideias, novos direitos",
    progressPercentage: 67,
    classId: "class-1",
    duration: "4 dias",
    aiSuggestions: true,
    activities: [
      {
        id: "act-1",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-2",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-3",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-4",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
      {
        id: "act-5",
        title: "Debate: Burguesia Incipiente",
        description:
          "Organize um debate sobre o surgimento da burguesia e sua atuação nas transformações",
      },
    ],
  },
  {
    id: "3",
    lessonNumber: 3,
    title: "Revolução Inglesa e a limitação do poder real",
    progressPercentage: 0,
    classId: "class-1",
  },
  {
    id: "4",
    lessonNumber: 4,
    title: "Revolução Industrial: máquinas, fábricas e trabalho",
    progressPercentage: 0,
    classId: "class-1",
  },
];

export function useLessonViewModel() {
  const [lessons] = useState<Lesson[]>(mockLessons);

  const getLessonsByClass = (classId: string) => {
    // mock behavior: returning all for now
    return lessons;
  };

  const getLessonById = (id: string) => {
    return lessons.find((l) => l.id === id);
  };

  return {
    lessons,
    getLessonsByClass,
    getLessonById,
  };
}
