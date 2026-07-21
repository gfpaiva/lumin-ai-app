import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";
import { Check, Lock, CircleDashed } from "lucide-react-native";
import { BimesterStatus } from "../types/bimester.types";

interface BimesterChipProps {
  title: string;
  status: BimesterStatus;
  isSelected?: boolean;
  onPress?: () => void;
}

export function BimesterChip({ title, status, isSelected, onPress }: BimesterChipProps) {
  const isLocked = status === "locked";
  
  // Base classes
  let containerClasses = "flex-row items-center justify-center gap-2 px-5 py-2.5 rounded-full border ";
  let textClasses = "text-base font-medium ";
  let iconColor = "#9CA3AF"; // text-muted-foreground

  if (isSelected) {
    containerClasses += "bg-indigo-900/50 border-indigo-500/50";
    textClasses += "text-white";
    iconColor = "#FFFFFF";
  } else if (isLocked) {
    containerClasses += "bg-transparent border-surface-neutral/30 opacity-60";
    textClasses += "text-muted-foreground";
    iconColor = "#6B7280"; 
  } else {
    // Done or in progress but not selected
    containerClasses += "bg-transparent border-surface-neutral/50";
    textClasses += "text-white";
    iconColor = "#9CA3AF";
  }

  return (
    <Pressable
      onPress={isLocked ? undefined : onPress}
      className={containerClasses}
    >
      <Text className={textClasses}>{title}</Text>
      {status === "done" && <Check size={16} color={iconColor} strokeWidth={2.5} />}
      {status === "in_progress" && <CircleDashed size={16} color={iconColor} strokeWidth={2.5} />}
      {status === "locked" && <Lock size={16} color={iconColor} strokeWidth={2.5} />}
    </Pressable>
  );
}
