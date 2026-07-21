import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface ScreenBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <View style={[styles.wrapper, style]} className={className}>
      <LinearGradient
        colors={["#081652", "#000000"]}
        locations={[0, 0.61]}
        style={StyleSheet.absoluteFill}
      />
      {children}
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
