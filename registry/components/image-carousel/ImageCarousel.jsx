import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

// ─── Animated Card ───────────────────────────────────────────────────────────

const AnimatedCard = React.memo(({
    item,
    index,
    scrollOffset,
    cardWidth,
    cardHeight,
    cardGap,
    showOverlay,
    orientation,
    layout,
    renderItem,
}) => {
    const isHorizontal = orientation === 'horizontal';
    const itemSize = (isHorizontal ? cardWidth : cardHeight) + cardGap;

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * itemSize,
            index * itemSize,
            (index + 1) * itemSize,
        ];

        let scale = 1;
        let rotateX = '0deg';
        let rotateY = '0deg';
        let opacity = 1;
        let translateY = 0;
        let translateX = 0;

        if (layout === 'depth') {
            scale = interpolate(scrollOffset.value, inputRange, [0.85, 1, 0.85], Extrapolation.CLAMP);
            rotateY = isHorizontal
                ? `${interpolate(scrollOffset.value, inputRange, [45, 0, -45], Extrapolation.CLAMP)}deg`
                : '0deg';
            rotateX = !isHorizontal
                ? `${interpolate(scrollOffset.value, inputRange, [-45, 0, 45], Extrapolation.CLAMP)}deg`
                : '0deg';
            opacity = interpolate(scrollOffset.value, inputRange, [0.4, 1, 0.4], Extrapolation.CLAMP);
            const move = interpolate(scrollOffset.value, inputRange, [15, 0, 15], Extrapolation.CLAMP);
            if (isHorizontal) translateY = move;
            else translateX = move;
        } else if (layout === 'stack') {
            scale = interpolate(scrollOffset.value, inputRange, [0.8, 1, 0.3], Extrapolation.CLAMP);
            opacity = interpolate(scrollOffset.value, inputRange, [0, 1, 0.3], Extrapolation.CLAMP);
            const slide = interpolate(scrollOffset.value, inputRange, [isHorizontal ? -cardWidth * 0.4 : -cardHeight * 0.4, 0, isHorizontal ? cardWidth * 1.2 : cardHeight * 1.2], Extrapolation.CLAMP);
            if (isHorizontal) translateX = slide;
            else translateY = slide;
        } else if (layout === 'perspective') {
            rotateY = isHorizontal
                ? `${interpolate(scrollOffset.value, inputRange, [90, 0, -90], Extrapolation.CLAMP)}deg`
                : '0deg';
            rotateX = !isHorizontal
                ? `${interpolate(scrollOffset.value, inputRange, [-90, 0, 90], Extrapolation.CLAMP)}deg`
                : '0deg';
            opacity = interpolate(scrollOffset.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
        }

        return {
            transform: [
                { perspective: 1200 },
                { scale },
                { rotateX },
                { rotateY },
                { translateX },
                { translateY },
            ],
            opacity,
            zIndex: interpolate(scrollOffset.value, inputRange, [1, 10, 1]),
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * itemSize,
            index * itemSize,
            (index + 1) * itemSize,
        ];

        const parallax = isHorizontal
            ? { translateX: interpolate(scrollOffset.value, inputRange, [-cardWidth * 0.25, 0, cardWidth * 0.25], Extrapolation.CLAMP) }
            : { translateY: interpolate(scrollOffset.value, inputRange, [-cardHeight * 0.25, 0, cardHeight * 0.25], Extrapolation.CLAMP) };

        return {
            transform: [{ scale: 1.3 }, parallax],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    width: cardWidth,
                    height: cardHeight,
                    marginHorizontal: isHorizontal ? cardGap / 2 : 0,
                    marginVertical: !isHorizontal ? cardGap / 2 : 0,
                    borderRadius: 32,
                    overflow: 'hidden',
                    backgroundColor: '#121212',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)',
                },
                styles.cardShadow,
                animatedStyle,
            ]}
        >
            {renderItem ? renderItem(item, index) : (
                <>
                    <View style={{ flex: 1, overflow: 'hidden', borderRadius: 32 }}>
                        <Animated.Image
                            source={item.image}
                            style={[{ width: '100%', height: '100%' }, imageAnimatedStyle]}
                            resizeMode="cover"
                        />
                    </View>

                    {showOverlay && (item.title || item.subtitle) && (
                        <>
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={styles.gradient}
                            />
                            <View style={styles.overlayContent}>
                                <View style={styles.glassmorphicLabel}>
                                    {item.title && (
                                        <Text style={styles.title}>{item.title}</Text>
                                    )}
                                    {item.subtitle && (
                                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                                    )}
                                </View>
                            </View>
                        </>
                    )}
                </>
            )}
        </Animated.View>
    );
});

// ─── Pagination Dot ──────────────────────────────────────────────────────────

const PaginationDot = React.memo(({ index, scrollOffset, itemSize }) => {
    const dotStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * itemSize,
            index * itemSize,
            (index + 1) * itemSize,
        ];

        const size = interpolate(
            scrollOffset.value,
            inputRange,
            [8, 32, 8],
            Extrapolation.CLAMP,
        );

        const opacity = interpolate(
            scrollOffset.value,
            inputRange,
            [0.2, 1, 0.2],
            Extrapolation.CLAMP,
        );

        return {
            width: size,
            opacity,
            transform: [{ scale: interpolate(scrollOffset.value, inputRange, [0.8, 1.2, 0.8], Extrapolation.CLAMP) }],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    marginHorizontal: 4,
                },
                dotStyle,
            ]}
        />
    );
});

// ─── Main Component ──────────────────────────────────────────────────────────

const ImageCarousel = ({
    data,
    cardWidth = Dimensions.get('window').width * 0.82,
    cardHeight = 400,
    cardGap = 12,
    autoPlay = true,
    autoPlayInterval = 4000,
    onSnapToItem,
    showOverlay = true,
    showPagination = true,
    orientation = 'horizontal',
    layout = 'depth',
    renderItem,
}) => {
    const isHorizontal = orientation === 'horizontal';
    const scrollOffset = useSharedValue(0);
    const scrollRef = useRef(null);
    const autoPlayTimer = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isUserScrolling = useRef(false);

    const itemSize = (isHorizontal ? cardWidth : cardHeight) + cardGap;
    const sideInset = isHorizontal
        ? (Dimensions.get('window').width - cardWidth) / 2 - cardGap / 2
        : (Dimensions.get('window').width - cardWidth) / 2;

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = isHorizontal ? event.contentOffset.x : event.contentOffset.y;
        },
    });

    const onMomentumEnd = useCallback(
        (event) => {
            const offset = isHorizontal ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
            const index = Math.round(offset / itemSize);
            setActiveIndex(index);
            onSnapToItem?.(index);
        },
        [isHorizontal, itemSize, onSnapToItem],
    );

    const startAutoPlay = useCallback(() => {
        if (!autoPlay || data.length <= 1) return;

        autoPlayTimer.current = setInterval(() => {
            if (isUserScrolling.current) return;

            setActiveIndex((prev) => {
                const next = prev + 1 >= data.length ? 0 : prev + 1;
                scrollRef.current?.scrollTo({
                    x: isHorizontal ? next * itemSize : 0,
                    y: !isHorizontal ? next * itemSize : 0,
                    animated: true,
                });
                return next;
            });
        }, autoPlayInterval);
    }, [autoPlay, autoPlayInterval, data.length, isHorizontal, itemSize]);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayTimer.current) {
            clearInterval(autoPlayTimer.current);
            autoPlayTimer.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay, stopAutoPlay]);

    return (
        <View style={!isHorizontal && { height: cardHeight + 100 }}>
            <Animated.ScrollView
                ref={scrollRef}
                horizontal={isHorizontal}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={isHorizontal ? {
                    paddingHorizontal: sideInset,
                } : {
                    paddingVertical: (Dimensions.get('window').width * 0.2),
                    alignItems: 'center',
                }}
                snapToInterval={itemSize}
                snapToAlignment="start"
                decelerationRate="fast"
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                onMomentumScrollEnd={onMomentumEnd}
                onScrollBeginDrag={() => {
                    isUserScrolling.current = true;
                    stopAutoPlay();
                }}
                onScrollEndDrag={() => {
                    isUserScrolling.current = false;
                    startAutoPlay();
                }}
            >
                {data.map((item, index) => (
                    <AnimatedCard
                        key={item.id}
                        item={item}
                        index={index}
                        scrollOffset={scrollOffset}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                        cardGap={cardGap}
                        showOverlay={showOverlay}
                        orientation={orientation}
                        layout={layout}
                        renderItem={renderItem}
                    />
                ))}
            </Animated.ScrollView>

            {showPagination && (
                <View style={[styles.pagination, !isHorizontal && styles.paginationVertical]}>
                    {data.map((_, index) => (
                        <PaginationDot
                            key={index}
                            index={index}
                            scrollOffset={scrollOffset}
                            itemSize={itemSize}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 24 },
        shadowOpacity: 0.6,
        shadowRadius: 32,
        elevation: 24,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
    },
    overlayContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
    },
    glassmorphicLabel: {
        padding: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.85)',
        marginTop: 6,
        letterSpacing: 0.2,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    paginationVertical: {
        flexDirection: 'column',
        position: 'absolute',
        right: 20,
        top: '50%',
        marginTop: 0,
        transform: [{ translateY: -100 }],
    },
});

export default ImageCarousel;
