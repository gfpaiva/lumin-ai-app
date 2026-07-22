import { useEffect, useState } from "react";
import { Activity, useLessonViewModel } from "./useLessonViewModel";

export type RecalibrateParams = {
  activityId: string;
  emphasis: "alta" | "media" | "baixa";
  complexity: "diminuir" | "manter" | "aumentar";
  observations: string;
};

export function useLessonDetailViewModel(lessonId: string) {
  const { getLessonById } = useLessonViewModel();
  const lesson = getLessonById(lessonId);

  const [isEditing, setIsEditing] = useState(false);
  const [localActivities, setLocalActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (lesson?.activities) {
      setLocalActivities(lesson.activities);
    }
  }, [lesson?.activities]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const saveChanges = () => {
    // Simula uma recomputação via API/IA
    setIsEditing(false);
  };

  const toggleActivityCompletion = (activityId: string) => {
    setLocalActivities((prev) =>
      prev.map((act) =>
        act.id === activityId ? { ...act, completed: !act.completed } : act,
      ),
    );
  };

  const removeActivity = (activityId: string) => {
    setLocalActivities((prev) => prev.filter((act) => act.id !== activityId));
  };

  const [isRecalibrating, setIsRecalibrating] = useState(false);

  const recalibrateActivity = async (params: RecalibrateParams) => {
    setIsRecalibrating(true);
    try {
      // Simula uma chamada assíncrona de IA
      await new Promise((resolve) => setTimeout(resolve, 7000));

      setLocalActivities((prev) =>
        prev.map((act) =>
          act.id === params.activityId
            ? {
                ...act,
                description: `${act.description} (Recalibrado: Ênfase ${params.emphasis}, Complexidade ${params.complexity})`,
              }
            : act,
        ),
      );
    } finally {
      setIsRecalibrating(false);
    }
  };

  // Mocks based on UI design
  return {
    lesson,
    localActivities,
    classLevel: "Avançado",
    isEditing,
    isRecalibrating,
    toggleEditMode,
    saveChanges,
    toggleActivityCompletion,
    removeActivity,
    recalibrateActivity,
  };
}
