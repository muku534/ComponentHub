import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    Platform
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const wp = (percentage) => (percentage * SCREEN_WIDTH) / 100;
const hp = (percentage) => (percentage * SCREEN_HEIGHT) / 100;

const DEFAULT_COLORS = {
    WhiteSmoke: '#F5F5F5',
    darkgray: '#374151',
    darkgray1: '#4B5563',
    BrightPink: '#FF0080',
    white: '#FFFFFF',
};

// Mock Haptics
// Haptics Helper
// For native haptic feedback, use the 'native-haptics' component from the registry.
// Example: import { triggerSelectionHaptic } from '../native-haptics/NativeHaptics';
const triggerSelectionHaptic = () => {
    // Uncomment detailed implementation in 'native-haptics' component
    // triggerSelectionHaptic();
};

const AnimatedTabBar = ({
    tabs = [],
    activeTab,
    onTabChange,
    backgroundColor,
    activeTabColor,
    tabTextColor,
    indicatorColor,
    style
}) => {
    // Default theme
    const COLORS = DEFAULT_COLORS;

    // Safe indexing
    const initialIndex = tabs.indexOf(activeTab);
    const indicatorAnim = useRef(new Animated.Value(initialIndex !== -1 ? initialIndex : 0)).current;

    const TAB_BAR_PADDING = wp(2);
    // Calculate tab width dynamically based on number of tabs
    const TAB_WIDTH = (wp(90) - TAB_BAR_PADDING * 2) / (tabs.length || 1);

    useEffect(() => {
        const tabIndex = tabs.indexOf(activeTab);
        if (tabIndex !== -1) {
            Animated.timing(indicatorAnim, {
                toValue: tabIndex,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [activeTab, tabs]);

    const getTabScale = (index) => ({
        transform: [
            {
                scale: indicatorAnim.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [1, 1.15, 1],
                    extrapolate: 'clamp',
                }),
            },
        ],
    });

    const getOpacity = (index) =>
        indicatorAnim.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
        });

    const handleTabPress = (tab) => {
        triggerSelectionHaptic();
        onTabChange(tab);
    };

    const styles = getStyles(
        COLORS,
        backgroundColor,
        activeTabColor,
        tabTextColor,
        indicatorColor
    );

    return (
        <View style={[styles.tabBarContainer, style, { paddingHorizontal: TAB_BAR_PADDING }]}>
            {/* Moving Indicator */}
            <Animated.View
                style={[
                    styles.tabIndicator,
                    {
                        width: TAB_WIDTH,
                        left: TAB_BAR_PADDING,
                        transform: [
                            {
                                translateX: indicatorAnim.interpolate({
                                    inputRange: tabs.map((_, i) => i),
                                    outputRange: tabs.map((_, i) => TAB_WIDTH * i),
                                }),
                            },
                        ],
                    },
                ]}
            />
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={tab}
                    style={styles.tabButton}
                    activeOpacity={0.8}
                    onPress={() => handleTabPress(tab)}
                >
                    <Animated.Text
                        style={[
                            styles.tabText,
                            getTabScale(index).transform && { transform: getTabScale(index).transform },
                            { opacity: getOpacity(index) },
                            activeTab === tab && styles.activeTabText,
                        ]}
                    >
                        {tab}
                    </Animated.Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const getStyles = (
    COLORS,
    backgroundColor,
    activeTabColor,
    tabTextColor,
    indicatorColor
) =>
    StyleSheet.create({
        tabBarContainer: {
            flexDirection: 'row',
            backgroundColor: backgroundColor || COLORS.WhiteSmoke,
            borderRadius: wp(6),
            marginHorizontal: wp(4),
            height: hp(5.4),
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        tabButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            zIndex: 2,
        },
        tabText: {
            fontSize: hp(1.8),
            color: tabTextColor || COLORS.darkgray,
            fontWeight: '500',
        },
        activeTabText: {
            color: activeTabColor || COLORS.BrightPink,
            fontWeight: '700',
        },
        tabIndicator: {
            position: 'absolute',
            left: 0,
            height: hp(4.5),
            backgroundColor: indicatorColor || COLORS.white,
            borderRadius: wp(6),
            zIndex: 1,
            ...Platform.select({
                ios: {
                    shadowColor: indicatorColor || COLORS.darkgray1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                },
                android: {
                    shadowColor: indicatorColor || COLORS.darkgray1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                    elevation: 14,
                }
            }),
        },
    });

export default AnimatedTabBar;
