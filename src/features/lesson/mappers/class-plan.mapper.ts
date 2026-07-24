import {
  Activity,
  ActivityDto,
  ClassPlan,
  ClassPlanDto,
  Lesson,
  LessonDto,
} from "../types/lesson.types";

export function mapActivityDtoToDomain(dto: ActivityDto): Activity {
  const isCompleted =
    dto.completedAt !== undefined
      ? Boolean(dto.completedAt)
      : Boolean(dto.completed);

  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    completed: isCompleted,
    completedAt: dto.completedAt ?? null,
    duration: dto.duration,
  };
}

export function mapActivityDomainToDto(activity: Activity): ActivityDto {
  const completedAt = activity.completed
    ? activity.completedAt || new Date().toISOString()
    : null;

  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    duration: activity.duration,
    completedAt,
  };
}

export function mapLessonDomainToDto(lesson: Lesson): Partial<LessonDto> {
  const durationNum =
    typeof lesson.duration === "number"
      ? lesson.duration
      : Number(lesson.duration) || 0;

  return {
    title: lesson.title,
    aiSuggestions: lesson.aiSuggestions,
    duration: durationNum,
    activities: (lesson.activities || []).map(mapActivityDomainToDto),
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
    duration: dto.duration !== undefined ? String(dto.duration) : undefined,
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
