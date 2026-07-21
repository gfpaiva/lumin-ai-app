export type BimesterStatus = "done" | "in_progress" | "locked";

export interface Bimester {
  id: string;
  title: string;
  status: BimesterStatus;
  progress: {
    classesTaught: number;
    totalClasses: number;
    percentage: number;
    classesCount: number;
    subjectsCount: number;
    performancePercentage: number;
  };
}
