import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';

const OTP_LENGTH = 4;
const BOX_SIZE = 60;
const GAP = 15;
const RADIUS = 50; // The radius of the loader circle

export type OtpStatus = 'idle' | 'loading' | 'success' | 'error';

interface DynamicOtpProps {
  onComplete?: (otp: string) => void;
  status?: OtpStatus;
}

const SPRING_CONFIG = {
  damping: 16,
  stiffness: 100,
  mass: 0.8,
};

export function DynamicOtp({ onComplete, status = 'idle' }: DynamicOtpProps) {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<{ focus: () => void; blur: () => void }>(null);

  // Animation values
  const morphProgress = useSharedValue(0); // 0 = Horizontal, 1 = Diamond
  const spinRotation = useSharedValue(0);  // Container continuous spin
  const errorShake = useSharedValue(0);
  const successMerge = useSharedValue(0);  // 0 = Diamond, 1 = Center Checkmark

  useEffect(() => {
    if (status === 'loading') {
      morphProgress.value = withSpring(1, SPRING_CONFIG);
      spinRotation.value = withRepeat(
        withTiming(360, { duration: 2500, easing: Easing.inOut(Easing.quad) }),
        -1,
        false
      );
    } else if (status === 'error') {
      spinRotation.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      morphProgress.value = withSpring(0, SPRING_CONFIG);
      
      errorShake.value = withSequence(
        withDelay(300, withTiming(15, { duration: 50 })),
        withSpring(0, { damping: 4, stiffness: 600, mass: 0.5 }, (finished) => {
          if (finished) runOnJS(setCode)('');
        })
      );
    } else if (status === 'success') {
      // Keep spinning but merge into center
      spinRotation.value = withTiming(Math.ceil(spinRotation.value / 90) * 90 + 90, { duration: 600, easing: Easing.out(Easing.cubic) });
      successMerge.value = withSpring(1, { damping: 14, stiffness: 90, mass: 0.8 });
    } else {
      morphProgress.value = withSpring(0, SPRING_CONFIG);
      spinRotation.value = 0;
      successMerge.value = 0;
      errorShake.value = 0;
    }
  }, [status]);

  const handlePress = () => {
    if (status === 'idle' || status === 'error') {
      inputRef.current?.focus();
    }
  };

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCode(numericValue);
    
    if (numericValue.length === OTP_LENGTH) {
      Keyboard.dismiss();
      if (onComplete) onComplete(numericValue);
    }
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: errorShake.value },
        { rotate: `${spinRotation.value}deg` }
      ] as any,
    };
  });

  // Base physics coordinates for the "Arm" approach
  // We place an invisible rotating arm in the center. The box sits at the end of the arm.
  const armConfigs = [
    { startDist: 112.5, startAngle: 180, endAngle: 180 }, // Box 0: Far Left -> Left
    { startDist: 37.5,  startAngle: 180, endAngle: 270 }, // Box 1: Mid Left -> Top
    { startDist: 37.5,  startAngle: 0,   endAngle: 90 },  // Box 2: Mid Right -> Bottom
    { startDist: 112.5, startAngle: 0,   endAngle: 0 },   // Box 3: Far Right -> Right
  ];

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress} style={styles.pressableArea}>
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChangeText}
          maxLength={OTP_LENGTH}
          keyboardType="number-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.hiddenInput}
          caretHidden
        />

        <Animated.View style={[styles.centerContainer, containerStyle]}>
          
          {armConfigs.map((config, index) => {
            const char = code[index] || '';
            const isActive = isFocused && code.length === index;
            
            const armStyle = useAnimatedStyle(() => {
              const currentAngle = interpolate(morphProgress.value, [0, 1], [config.startAngle, config.endAngle]);
              return {
                transform: [{ rotate: `${currentAngle}deg` }]
              };
            });

            const boxStyle = useAnimatedStyle(() => {
              // Interpolate distance from horizontal to RADIUS, and then to 0 for success merge
              const loadingDist = interpolate(morphProgress.value, [0, 1], [config.startDist, RADIUS]);
              const finalDist = interpolate(successMerge.value, [0, 1], [loadingDist, 0]);

              const currentAngle = interpolate(morphProgress.value, [0, 1], [config.startAngle, config.endAngle]);
              const counterRotate = -currentAngle - spinRotation.value; // Keep box perfectly upright

              const idleBorder = isActive ? '#FF5500' : '#27272A';
              const idleBg = isActive ? 'rgba(255,85,0,0.05)' : '#18181B';
              
              const borderColor = interpolateColor(
                successMerge.value,
                [0, 1],
                [status === 'error' ? '#EF4444' : idleBorder, '#10B981']
              );
              
              const backgroundColor = interpolateColor(
                successMerge.value,
                [0, 1],
                [status === 'error' ? 'rgba(239,68,68,0.1)' : idleBg, '#10B981']
              );

              return {
                transform: [
                  { translateX: finalDist },
                  { rotate: `${counterRotate}deg` } 
                ] as any,
                borderColor,
                backgroundColor,
                borderRadius: interpolate(successMerge.value, [0, 1], [16, 30]),
                shadowColor: isActive || successMerge.value > 0 ? borderColor : 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: isActive ? 0.3 : (successMerge.value > 0 ? 0.6 : 0),
                shadowRadius: 10,
                elevation: isActive ? 4 : 0,
                opacity: successMerge.value > 0.5 && index !== 0 ? 0 : 1, // Hide other boxes instantly once merged
              };
            });
            
            const textStyle = useAnimatedStyle(() => ({
              opacity: interpolate(successMerge.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
              transform: [{ scale: interpolate(successMerge.value, [0, 0.5, 1], [1, 0, 0], Extrapolation.CLAMP) }] as any
            }));

            return (
              <Animated.View key={index} style={[styles.arm, armStyle]}>
                <Animated.View style={[styles.box, boxStyle]}>
                  <Animated.Text style={[styles.text, textStyle]}>
                    {char}
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
            );
          })}
          
          {/* Success Checkmark anchored perfectly in the absolute center */}
          <Animated.View style={[styles.checkmarkContainer, useAnimatedStyle(() => ({
            opacity: interpolate(successMerge.value, [0.7, 1], [0, 1], Extrapolation.CLAMP),
            transform: [
              { scale: interpolate(successMerge.value, [0.7, 1], [0.3, 1], Extrapolation.CLAMP) }, 
              { rotate: `${-spinRotation.value}deg` } 
            ] as any
          }))]}>
            <Text style={styles.checkmark}>✓</Text>
          </Animated.View>

        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableArea: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    // This is a 0x0 point exactly in the middle
    width: 0, 
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arm: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  box: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '500',
  },
  checkmarkContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  checkmark: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
  }
});
