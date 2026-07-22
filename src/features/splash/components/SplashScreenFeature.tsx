import { ScreenBackground } from "@/src/components/screen-background";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSplashViewModel } from "../hooks/useSplashViewModel";
import { AnimatedLuminLogo } from "./AnimatedLuminLogo";

export function SplashScreenFeature() {
  const { isPulsing, onSequenceComplete, fadeStyle } = useSplashViewModel();

  return (
    <Animated.View className="flex-1 relative" style={fadeStyle}>
      <ScreenBackground>
        <View className="flex-1 items-center justify-center">
          <AnimatedLuminLogo
            isPulsing={isPulsing}
            onSequenceComplete={onSequenceComplete}
          />
        </View>
      </ScreenBackground>
    </Animated.View>
  );
}
