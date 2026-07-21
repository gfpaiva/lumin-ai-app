import { useEffect, useState } from "react";
import { Activity, useLessonViewModel } from "./useLessonViewModel";

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
        act.id === activityId ? { ...act, completed: !act.completed } : act
      )
    );
  };

  const removeActivity = (activityId: string) => {
    setLocalActivities((prev) => prev.filter((act) => act.id !== activityId));
  };

  // Mocks based on UI design
  return {
    lesson,
    localActivities,
    classLevel: "Avançado",
    isEditing,
    toggleEditMode,
    saveChanges,
    toggleActivityCompletion,
    removeActivity,
  };
}
