import { Box } from "@/src/components/ui/box";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export interface ScreenBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  isLoading?: boolean;
}

const PHRASES = [
  "Estamos preparando o material para você...",
  "Construindo uma experiência especial para seus alunos...",
  "Trabalhando no planejamento de suas aulas...",
  "Organizando atividades e exercícios...",
];

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  style,
  className,
  isLoading = false,
}) => {
  const pulseOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLoading) {
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );

      // Start text animation
      setPhraseIndex(Math.floor(Math.random() * PHRASES.length));
      textOpacity.value = withTiming(1, { duration: 800 });

      intervalId = setInterval(() => {
        textOpacity.value = withTiming(0, { duration: 800 });
        setTimeout(() => {
          setPhraseIndex((prev) => {
            let next = Math.floor(Math.random() * PHRASES.length);
            if (next === prev) next = (next + 1) % PHRASES.length;
            return next;
          });
          textOpacity.value = withTiming(1, { duration: 800 });
        }, 900); // slightly longer than fade out
      }, 4000); // rotate every 4 seconds
    } else {
      pulseOpacity.value = withTiming(0, { duration: 500 });
      textOpacity.value = withTiming(0, { duration: 500 });
    }

    return () => clearInterval(intervalId);
  }, [isLoading, pulseOpacity, textOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
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

      {/* Main Content */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { zIndex: isLoading ? 0 : 10, opacity: isLoading ? 0.3 : 1 },
        ]}
        pointerEvents={isLoading ? "none" : "auto"}
      >
        <Box className="pt-12 px-6 flex-1">{children}</Box>
      </Animated.View>

      {/* Loading Overlay Texts */}
      {isLoading && (
        <View
          style={[StyleSheet.absoluteFill, styles.loadingOverlay]}
          pointerEvents="none"
        >
          <Animated.Text style={[styles.loadingText, textStyle]}>
            {PHRASES[phraseIndex]}
          </Animated.Text>
        </View>
      )}
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
  loadingOverlay: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    paddingHorizontal: 32,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
    zIndex: 2,
  },
  glowContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default ScreenBackground;
