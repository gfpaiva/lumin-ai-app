import { BimesterStorePort } from "@/src/common/ports/bimester.store.port";
import { BimesterApiService } from "@/src/features/bimester/api/bimester.service";
import { BimesterServicePort } from "@/src/features/bimester/api/bimester.service.port";
import { useBimesterStore } from "@/src/infra/store/bimester.store";
import { useCallback, useEffect, useState } from "react";
import { ClassStorePort } from "../../../common/ports/class.store.port";
import { SchoolStorePort } from "../../../common/ports/school.store.port";
import { useClassStore } from "../../../infra/store/class.store";
import { useSchoolStore } from "../../../infra/store/school.store";
import { ClassApiService } from "../api/class.service";
import { ClassServicePort } from "../api/class.service.port";
import type {
  EducationLevel,
  EngagementProfile,
  LearningFormat,
} from "../types/class.types";

export type ClassFormStep = 1 | 2;

interface ClassFormData {
  name: string;
  subject: string;
  educationLevel: EducationLevel;
  engagementProfile: EngagementProfile;
  learningFormat: LearningFormat;
}

const DEFAULT_FORM_DATA: ClassFormData = {
  name: "",
  subject: "",
  educationLevel: "Fundamental",
  engagementProfile: "Participativa",
  learningFormat: "Visual",
};

const defaultClassService = new ClassApiService();
const defaultBimesterService = new BimesterApiService();

export function useClassFormViewModel(
  isOpen: boolean,
  classStore: ClassStorePort = useClassStore,
  schoolStore: SchoolStorePort = useSchoolStore,
  bimesterStore: BimesterStorePort = useBimesterStore,
  classService: ClassServicePort = defaultClassService,
  bimesterService: BimesterServicePort = defaultBimesterService,
) {
  const [step, setStep] = useState<ClassFormStep>(1);
  const [formData, setFormData] = useState<ClassFormData>(DEFAULT_FORM_DATA);

  const [isLoading, setIsLoading] = useState(false);

  const classes = classStore((state) => state.classes);
  const setClasses = classStore((state) => state.setClasses);
  const selectedSchoolId = schoolStore((state) => state.selectedSchoolId);
  const incrementClassCount = schoolStore((state) => state.incrementClassCount);
  const setBimesters = bimesterStore((state) => state.setBimesters);

  // Reset form when bottom sheet closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setFormData(DEFAULT_FORM_DATA);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleContinue = () => {
    setStep(2);
  };

  const handleSave = useCallback(
    async (onClose: () => void) => {
      if (!selectedSchoolId) return;

      setIsLoading(true);

      try {
        onClose();
        const newClass = await classService.createClass({
          name: formData.name,
          subject: formData.subject,
          educationLevel: formData.educationLevel,
          engagementProfile: formData.engagementProfile,
          learningFormat: formData.learningFormat,
          schoolId: selectedSchoolId,
        });

        // Local update after success
        setClasses([...classes, newClass]);
        incrementClassCount(selectedSchoolId);

        const updatedBimesters = await bimesterService.getBimesters();
        setBimesters(updatedBimesters);
      } catch (error) {
        console.error("Failed to add class", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      selectedSchoolId,
      classService,
      formData.name,
      formData.subject,
      formData.educationLevel,
      formData.engagementProfile,
      formData.learningFormat,
      setClasses,
      classes,
      incrementClassCount,
      bimesterService,
      setBimesters,
    ],
  );

  const setField = <K extends keyof ClassFormData>(
    key: K,
    value: ClassFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    step,
    formData,
    isLoading,
    setField,
    handleContinue,
    handleSave,
  };
}
