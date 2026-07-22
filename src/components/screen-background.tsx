import { Box } from "@/src/components/ui/box";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

export interface ScreenBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  isRecalibrating?: boolean;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  style,
  className,
  isRecalibrating = false,
}) => {
  const pulseOpacity = useSharedValue(0);

  useEffect(() => {
    if (isRecalibrating) {
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseOpacity.value = withTiming(0, { duration: 500 });
    }
  }, [isRecalibrating, pulseOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={[styles.wrapper, style]} className={className}>
      {/* Base Gradient */}
      <LinearGradient
        colors={["#081652", "#000000"]}
        locations={[0, 0.61]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Pulse Gradient */}
      <Animated.View style={[StyleSheet.absoluteFill, pulseStyle]}>
        <LinearGradient
          colors={["#1e3a8a", "#000000"]}
          locations={[0, 0.8]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Box className="pt-12 px-6 flex-1">{children}</Box>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
});

export default ScreenBackground;
