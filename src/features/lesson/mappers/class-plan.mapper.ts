import {
  Activity,
  ActivityDto,
  ClassPlan,
  ClassPlanDto,
  Lesson,
  LessonDto,
} from "../types/lesson.types";

export function mapActivityDtoToDomain(dto: ActivityDto): Activity {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    completed: Boolean(dto.completed),
    duration: dto.duration,
  };
}

export function mapLessonDtoToDomain(
  dto: LessonDto,
  classId: string,
  bimesterId: string,
): Lesson {
  const activities = dto.activities?.map(mapActivityDtoToDomain) ?? [];
  let progressPercentage = dto.progressPercentage;

  if (progressPercentage === undefined) {
    if (activities.length > 0) {
      const completedCount = activities.filter((a) => a.completed).length;
      progressPercentage = Math.round(
        (completedCount / activities.length) * 100,
      );
    } else {
      progressPercentage = 0;
    }
  }

  return {
    id: `${classId}_${bimesterId}_${dto.lessonNumber}`,
    lessonNumber: dto.lessonNumber,
    title: dto.title,
    progressPercentage,
    classId,
    duration: dto.duration,
    aiSuggestions: dto.aiSuggestions,
    activities,
  };
}

export function mapClassPlanDtoToDomain(dto: ClassPlanDto): ClassPlan {
  return {
    id: dto.id,
    classId: dto.classId,
    bimesterId: dto.bimesterId,
    theme: dto.theme,
    lessons: (dto.lessons || []).map((lessonDto) =>
      mapLessonDtoToDomain(lessonDto, dto.classId, dto.bimesterId),
    ),
  };
}
