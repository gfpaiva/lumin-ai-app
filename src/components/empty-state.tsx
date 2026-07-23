import { Icon } from "@/src/components/ui/icon";
import { LucideIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon: IconComponent,
  title,
  description,
  children,
}: EmptyStateProps) {
  const rotation1 = useSharedValue(0);
  const rotation2 = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    rotation1.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1,
      false,
    );
    rotation2.value = withRepeat(
      withTiming(-360, { duration: 12000, easing: Easing.linear }),
      -1,
      false,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [rotation1, rotation2, scale]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation1.value}deg` }, { scale: scale.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation2.value}deg` }, { scale: scale.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center px-6 mt-12 mb-12">
      <View className="relative w-48 h-48 items-center justify-center mb-8">
        <Animated.View
          className="absolute w-44 h-44 bg-primary/20"
          style={[
            {
              borderRadius: 100,
              borderTopLeftRadius: 60,
              borderBottomRightRadius: 70,
            },
            animatedStyle1,
          ]}
        />

        <Animated.View
          className="absolute w-36 h-36 bg-primary/30"
          style={[
            {
              borderRadius: 80,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 60,
            },
            animatedStyle2,
          ]}
        />

        <View className="w-16 h-16 bg-primary rounded-full items-center justify-center z-10 shadow-sm">
          <Icon as={IconComponent} size="xl" className="text-primary-foreground" />
        </View>
      </View>

      <Text className="text-2xl font-semibold text-foreground mb-2 text-center">
        {title}
      </Text>
      <Text className="text-base text-muted-foreground text-center mb-8 px-2">
        {description}
      </Text>
      {children}
    </View>
  );
}
