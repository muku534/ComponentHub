import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    DimensionValue,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_COLORS = {
    shimmer: ['#E0E0E0', '#F5F5F5', '#E0E0E0'],
    base: '#E0E0E0',
};

interface SkeletonLoaderProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: ViewStyle;
    duration?: number;
}

const SkeletonLoader = ({
    width = '100%',
    height = 20,
    borderRadius = 4,
    style,
    duration = 1500,
}: SkeletonLoaderProps) => {
    const translateX = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            })
        ).start();
    }, [duration]);

    return (
        <View
            style={[
                styles.container,
                { width, height, borderRadius, backgroundColor: DEFAULT_COLORS.base },
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [
                            {
                                translateX: translateX.interpolate({
                                    inputRange: [-1, 1],
                                    outputRange: [-100, 300], // Approximate width movement
                                }),
                            },
                        ],
                    },
                ]}
            >
                <LinearGradient
                    colors={DEFAULT_COLORS.shimmer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

// Pre-built variants for easy usage
export const SkeletonCard = () => (
    <View style={styles.card}>
        <SkeletonLoader height={150} borderRadius={8} />
        <View style={styles.content}>
            <SkeletonLoader width="80%" height={20} style={{ marginBottom: 10 }} />
            <SkeletonLoader width="40%" height={15} />
        </View>
    </View>
);

export const SkeletonList = ({ count = 3 }) => (
    <View>
        {Array.from({ length: count }).map((_, i) => (
            <View key={i} style={styles.listItem}>
                <SkeletonLoader width={50} height={50} borderRadius={25} />
                <View style={{ marginLeft: 15, flex: 1 }}>
                    <SkeletonLoader width="70%" height={15} style={{ marginBottom: 8 }} />
                    <SkeletonLoader width="40%" height={12} />
                </View>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    card: {
        marginBottom: 16,
    },
    content: {
        marginTop: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
});

export default SkeletonLoader;
