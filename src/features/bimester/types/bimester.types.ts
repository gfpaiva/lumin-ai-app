export type BimesterStatus = "done" | "in_progress" | "locked";

export interface Bimester {
  id: string;
  year: number;
  title: string;
  status: BimesterStatus;
  progress: {
    classesTaught: number;
    totalLessons: number;
    percentage: number;
    classesCount: number;
    subjectsCount: number;
    performancePercentage: number;
  };
}
