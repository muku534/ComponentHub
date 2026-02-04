import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const DEFAULT_COLORS = {
    WhiteSmoke: '#F5F5F5',
    white: '#FFFFFF',
};

interface RainbowButtonProps {
    width: number;
    height: number;
    borderRadius?: number;
    borderWidth?: number;
    children?: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
    backgroundColor?: string;
    colors?: {
        start?: string;
        middle?: string;
        end?: string;
        bg?: string;
    }
}

const RainbowButton = ({
    width,
    height,
    borderRadius = 16,
    borderWidth = 2,
    children,
    style,
    onPress,
    backgroundColor
}: RainbowButtonProps) => {
    const COLORS = DEFAULT_COLORS;
    const anim = useRef(new Animated.Value(0)).current;

    // Calculates perimeter of the rounded rectangle
    const perimeter = 2 * (width + height - 2 * borderRadius) + 2 * Math.PI * borderRadius;
    const sweepLength = perimeter * 0.35; // Length of colored segment

    useEffect(() => {
        Animated.loop(
            Animated.timing(anim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        ).start();
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}
        >
            <View style={{
                position: 'absolute',
                width,
                height,
                borderRadius,
                overflow: 'hidden',
            }}>
                <Svg width={width} height={height}>
                    <Defs>
                        <LinearGradient id="rainbow" x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
                            <Stop offset="0%" stopColor="#00C0FF" />
                            <Stop offset="33%" stopColor="#FFCF00" />
                            <Stop offset="66%" stopColor="#FC4F4F" />
                            <Stop offset="100%" stopColor="#00C0FF" />
                        </LinearGradient>
                    </Defs>
                    {/* Transparent border pathway */}
                    <Rect
                        x={borderWidth / 2}
                        y={borderWidth / 2}
                        width={width - borderWidth}
                        height={height - borderWidth}
                        rx={borderRadius - borderWidth / 2}
                        ry={borderRadius - borderWidth / 2}
                        stroke={COLORS.WhiteSmoke}
                        strokeWidth={borderWidth}
                        fill="none"
                    />
                    {/* Animated rainbow segment */}
                    <AnimatedRect
                        x={borderWidth / 2}
                        y={borderWidth / 2}
                        width={width - borderWidth}
                        height={height - borderWidth}
                        rx={borderRadius - borderWidth / 2}
                        ry={borderRadius - borderWidth / 2}
                        stroke="url(#rainbow)"
                        strokeWidth={borderWidth}
                        fill="none"
                        strokeDasharray={`${sweepLength},${perimeter - sweepLength}`}
                        strokeDashoffset={anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -perimeter],
                        })}
                    />
                </Svg>
            </View>
            <View
                style={{
                    width: width - borderWidth * 2,
                    height: height - borderWidth * 2,
                    borderRadius: borderRadius - borderWidth,
                    backgroundColor: backgroundColor || COLORS.WhiteSmoke,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {children}
            </View>
        </TouchableOpacity>
    );
};

export default RainbowButton;
