import { useEffect, useState, useCallback, useRef } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { initializationSimulatorAdapter } from '@/src/infra/initialization/initialization.simulator.adapter';

export type AnimationPhase = 'sequence' | 'pulsing' | 'fadeout' | 'done';

export function useSplashViewModel() {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('sequence');
  const router = useRouter();
  const containerOpacity = useSharedValue(1);

  // We need to track if both conditions for fadeout are met
  const isBackendResolved = useRef(false);
  const isSequenceComplete = useRef(false);

  const checkAndTriggerFadeOut = useCallback(() => {
    if (isBackendResolved.current && isSequenceComplete.current) {
      setAnimationPhase('fadeout');
      containerOpacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(onFadeOutComplete)();
        }
      });
    }
  }, []);

  const onFadeOutComplete = useCallback(() => {
    setAnimationPhase('done');
    router.replace('/(home)');
  }, [router]);

  const onSequenceComplete = useCallback(() => {
    isSequenceComplete.current = true;
    if (!isBackendResolved.current) {
      setAnimationPhase('pulsing');
    }
    checkAndTriggerFadeOut();
  }, [checkAndTriggerFadeOut]);

  useEffect(() => {
    let isMounted = true;
    initializationSimulatorAdapter
      .initialize()
      .then(() => {
        if (!isMounted) return;
        isBackendResolved.current = true;
        checkAndTriggerFadeOut();
      })
      .catch((err) => {
        console.error('Failed to initialize app', err);
        // Even if it fails, we should probably proceed or show an error.
        // For now, proceed.
        if (!isMounted) return;
        isBackendResolved.current = true;
        checkAndTriggerFadeOut();
      });

    return () => {
      isMounted = false;
    };
  }, [checkAndTriggerFadeOut]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const isPulsing = animationPhase === 'pulsing';

  return {
    animationPhase,
    isPulsing,
    onSequenceComplete,
    fadeStyle,
  };
}
