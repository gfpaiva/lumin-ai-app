const fs = require('fs');

const svg = fs.readFileSync('assets/lumin-logo.svg', 'utf8');
const pathMatch = svg.match(/d="([^"]+)"/);
const path = pathMatch[1];

const parts = path.split('ZM').map(p => p.includes('Z') ? p : p + 'Z');
const fixedParts = parts.map((p, i) => i === 0 ? p : 'M' + p);

// Identified parts:
// 0: a outer
// 1: u
// 2: . (dot)
// 3: m
// 4: n
// 5: l
// 6: i1
// 7: i2
// 8: a inner

const letterPaths = [
  fixedParts[5], // l
  fixedParts[1], // u
  fixedParts[3], // m
  fixedParts[6], // i1
  fixedParts[4], // n
  fixedParts[2], // .
  fixedParts[0] + fixedParts[8], // a (outer + inner combined)
  fixedParts[7], // i2
];

const componentCode = `import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Defs, Filter, FeGaussianBlur } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export interface AnimatedLuminLogoProps {
  width?: number;
  height?: number;
  color?: string;
  isPulsing?: boolean;
  onSequenceComplete?: () => void;
}

const PATHS = [
${letterPaths.map(p => `  "${p}",`).join('\n')}
];

export function AnimatedLuminLogo({
  width = 120,
  height = 26,
  color = '#FFFFFF',
  isPulsing = false,
  onSequenceComplete,
}: AnimatedLuminLogoProps) {
  // We use 8 opacities, one for each letter/path.
  const opacities = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ];
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (isPulsing) {
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      pulseOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [isPulsing]);

  useEffect(() => {
    // Initial sequence animation
    PATHS.forEach((_, i) => {
      opacities[i].value = withDelay(
        i * 200,
        withTiming(1, { duration: 400 })
      );
    });

    const totalDuration = (PATHS.length - 1) * 200 + 400;
    const timeout = setTimeout(() => {
      onSequenceComplete?.();
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  return (
    <Animated.View style={pulseStyle}>
      <Svg width={width} height={height} viewBox="0 0 161 36" fill="none">
        <Defs>
          <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <FeGaussianBlur stdDeviation="3" result="blur" />
          </Filter>
        </Defs>

        {/* Base layer */}
        {PATHS.map((d, i) => (
          <Path key={\`base-\${i}\`} d={d} fill={color} fillRule="evenodd" clipRule="evenodd" />
        ))}

        {/* Glow layer */}
        {PATHS.map((d, i) => {
          const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacities[i].value,
          }));

          return (
            <AnimatedPath
              key={\`glow-\${i}\`}
              d={d}
              fill="#FFFFFF"
              filter="url(#glow)"
              style={animatedStyle}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          );
        })}

        {/* Highlight layer */}
        {PATHS.map((d, i) => {
          const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacities[i].value,
          }));

          return (
            <AnimatedPath
              key={\`highlight-\${i}\`}
              d={d}
              fill="#FFFFFF"
              style={animatedStyle}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          );
        })}
      </Svg>
    </Animated.View>
  );
}
`;

fs.writeFileSync('src/features/splash/components/AnimatedLuminLogo.tsx', componentCode);
console.log('Fixed AnimatedLuminLogo.tsx successfully.');
