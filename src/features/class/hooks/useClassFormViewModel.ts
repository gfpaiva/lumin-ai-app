import { useCallback, useEffect, useState } from "react";
import { ClassStorePort } from "../../../common/ports/class.store.port";
import { HttpPort } from "../../../common/ports/http.port";
import { SchoolStorePort } from "../../../common/ports/school.store.port";
import { FetchAdapter } from "../../../infra/http/fetch.adapter";
import { useClassStore } from "../../../infra/store/class.store";
import { useSchoolStore } from "../../../infra/store/school.store";
import type {
  Class,
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

const defaultHttpAdapter = new FetchAdapter();

export function useClassFormViewModel(
  isOpen: boolean,
  classStore: ClassStorePort = useClassStore,
  schoolStore: SchoolStorePort = useSchoolStore,
  httpAdapter: HttpPort = defaultHttpAdapter,
) {
  const [step, setStep] = useState<ClassFormStep>(1);
  const [formData, setFormData] = useState<ClassFormData>(DEFAULT_FORM_DATA);

  const [isLoading, setIsLoading] = useState(false);

  const addClassOptimistic = classStore((state) => state.addClassOptimistic);
  const rollbackClass = classStore((state) => state.rollbackClass);
  const classes = classStore((state) => state.classes);
  const setClasses = classStore((state) => state.setClasses);
  const selectedSchoolId = schoolStore((state) => state.selectedSchoolId);
  const incrementClassCount = schoolStore(
    (state) => state.incrementClassCount,
  );

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
        // In a real scenario, we use the returned class with the real backend ID
        const { data: newClass } = await httpAdapter.post<Class>("/classes", {
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
      } catch (error) {
        console.error("Failed to add class", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      selectedSchoolId,
      formData,
      classes,
      setClasses,
      httpAdapter,
      incrementClassCount,
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
