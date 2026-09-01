import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
    interpolateColor,
} from 'react-native-reanimated';
import { Home, User, Plus, MessageCircle, Users, Archive, Search, Bell, ChevronRight } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TAB_BAR_HEIGHT = 80;
const FAB_SIZE = 56;
const SPRING_CONFIG = { damping: 15, stiffness: 180, mass: 1 };

const TabItem = ({ name, activeTab, onTabPress, IconComponent }: any) => {
    const isActive = activeTab === name;

    const scale = useSharedValue(isActive ? 1.1 : 1);

    useEffect(() => {
        scale.value = withSpring(isActive ? 1.1 : 1, { damping: 16, stiffness: 120 });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable style={styles.tabItem} onPress={() => onTabPress(name)}>
            <Animated.View style={[styles.iconWrapper, animatedStyle]}>
                <IconComponent size={24} color={isActive ? "#18181b" : "#52525b"} strokeWidth={isActive ? 2.5 : 2} />
            </Animated.View>
        </Pressable>
    );
};

const TABS = ['home', 'search', 'bell', 'user'];

export default function ExpandableActionMenu() {
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const progress = useSharedValue(0);
    const activeIndexAnim = useSharedValue(0);

    const TAB_WIDTH = (SCREEN_WIDTH - 24 - 80) / 4;

    const handleTabPress = (name: string) => {
        setActiveTab(name);
        const index = TABS.indexOf(name);
        // Smoother, less bouncy slide
        activeIndexAnim.value = withSpring(index, { damping: 20, stiffness: 150, mass: 1 });
    };

    const toggleExpand = () => {
        const newValue = expanded ? 0 : 1;
        setExpanded(!expanded);
        progress.value = withSpring(newValue, SPRING_CONFIG);
    };

    const backdropStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            pointerEvents: progress.value > 0 ? 'auto' : 'none',
        };
    });

    const fabStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: interpolate(progress.value, [0, 1], [0, 32]) },
                { rotate: `${progress.value * 45}deg` }
            ],
            backgroundColor: '#18181b' // Keep it black for bold contrast
        };
    });

    const iconWhiteStyle = useAnimatedStyle(() => ({
        opacity: 1 // Always show the white icon
    }));

    const iconBlackStyle = useAnimatedStyle(() => ({
        opacity: 0
    }));

    const tabBarStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(progress.value, [0, 1], [TAB_BAR_HEIGHT, 310]),
            borderTopLeftRadius: interpolate(progress.value, [0, 1], [24, 36]),
            borderTopRightRadius: interpolate(progress.value, [0, 1], [24, 36]),
        };
    });

    const otherIconsStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(progress.value, [0, 0.3], [1, 0]),
            transform: [
                { translateY: interpolate(progress.value, [0, 0.3], [0, 20]) }
            ],
            pointerEvents: progress.value > 0.1 ? 'none' : 'auto',
        };
    });

    const menuContentStyle = useAnimatedStyle(() => {
        return {
            pointerEvents: progress.value > 0.5 ? 'auto' : 'none',
        };
    });

    const handleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
        transform: [{ translateY: interpolate(progress.value, [0.5, 1], [10, 0], Extrapolate.CLAMP) }]
    }));

    const item1Style = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.3, 0.8], [0, 1], Extrapolate.CLAMP),
        transform: [{ translateY: interpolate(progress.value, [0.3, 0.8], [30, 0], Extrapolate.CLAMP) }]
    }));

    const item2Style = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.4, 0.9], [0, 1], Extrapolate.CLAMP),
        transform: [{ translateY: interpolate(progress.value, [0.4, 0.9], [30, 0], Extrapolate.CLAMP) }]
    }));

    const item3Style = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.5, 1.0], [0, 1], Extrapolate.CLAMP),
        transform: [{ translateY: interpolate(progress.value, [0.5, 1.0], [30, 0], Extrapolate.CLAMP) }]
    }));

    const indicatorStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            activeIndexAnim.value,
            [0, 1, 2, 3],
            [
                12 + 4,
                12 + TAB_WIDTH + 4,
                12 + TAB_WIDTH * 2 + 80 + 4,
                12 + TAB_WIDTH * 3 + 80 + 4
            ]
        );
        const translateY = interpolate(progress.value, [0, 0.3], [0, 20]);
        return {
            transform: [{ translateX }, { translateY }],
            // Apply the same opacity/translate as otherIconsStyle so it hides when modal opens
            opacity: interpolate(progress.value, [0, 0.3], [1, 0]),
        };
    });

    return (
        <View style={styles.container}>
            {/* Backdrop */}
            <Animated.View style={[styles.backdrop, backdropStyle]}>
                <Pressable style={StyleSheet.absoluteFill} onPress={toggleExpand} />
            </Animated.View>

            {/* Expanding Tab Bar Background */}
            <Animated.View style={[styles.tabBarBackground, tabBarStyle]}>

                {/* Expanded Menu Content */}
                <Animated.View style={[styles.menuContainer, menuContentStyle]}>
                    <Animated.View style={[styles.dragHandle, handleStyle]} />

                    <Animated.View style={item1Style}>
                        <Pressable style={({ pressed }: { pressed: boolean }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
                            <View style={[styles.menuIcon, { backgroundColor: '#e0f2fe' }]}>
                                <Archive size={22} color="#0284c7" strokeWidth={2.5} />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>Archived</Text>
                                <Text style={styles.menuSubtitle}>See hidden chats</Text>
                            </View>
                            <ChevronRight size={20} color="#d4d4d8" />
                        </Pressable>
                    </Animated.View>

                    <Animated.View style={[styles.separator, item2Style]} />

                    <Animated.View style={item2Style}>
                        <Pressable style={({ pressed }: { pressed: boolean }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
                            <View style={[styles.menuIcon, { backgroundColor: '#dcfce7' }]}>
                                <Users size={22} color="#16a34a" strokeWidth={2.5} />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>New Contacts</Text>
                                <Text style={styles.menuSubtitle}>Add a new friend</Text>
                            </View>
                            <ChevronRight size={20} color="#d4d4d8" />
                        </Pressable>
                    </Animated.View>

                    <Animated.View style={[styles.separator, item3Style]} />

                    <Animated.View style={item3Style}>
                        <Pressable style={({ pressed }: { pressed: boolean }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
                            <View style={[styles.menuIcon, { backgroundColor: '#f3e8ff' }]}>
                                <MessageCircle size={22} color="#9333ea" strokeWidth={2.5} />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>New Chat</Text>
                                <Text style={styles.menuSubtitle}>Start a new conversation</Text>
                            </View>
                            <ChevronRight size={20} color="#d4d4d8" />
                        </Pressable>
                    </Animated.View>
                </Animated.View>

                {/* Icons Row (Bottom) */}
                <View style={styles.iconsRow}>

                    {/* Sliding Pill Indicator */}
                    <Animated.View style={[styles.slidingIndicator, indicatorStyle, { width: TAB_WIDTH - 8 }]} />

                    <Animated.View style={[styles.sideIcons, otherIconsStyle]}>
                        <TabItem name="home" activeTab={activeTab} onTabPress={handleTabPress} IconComponent={Home} />
                        <TabItem name="search" activeTab={activeTab} onTabPress={handleTabPress} IconComponent={Search} />
                    </Animated.View>

                    <View style={styles.centerTabItem}>
                        <Pressable style={styles.fabContainer} onPress={toggleExpand}>
                            <Animated.View style={[styles.fab, fabStyle]}>
                                <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }, iconWhiteStyle]}>
                                    <Plus size={28} color="#ffffff" strokeWidth={2.5} />
                                </Animated.View>
                                <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }, iconBlackStyle]}>
                                    <Plus size={28} color="#18181b" strokeWidth={2.5} />
                                </Animated.View>
                            </Animated.View>
                        </Pressable>
                    </View>

                    <Animated.View style={[styles.sideIcons, otherIconsStyle]}>
                        <TabItem name="bell" activeTab={activeTab} onTabPress={handleTabPress} IconComponent={Bell} />
                        <TabItem name="user" activeTab={activeTab} onTabPress={handleTabPress} IconComponent={User} />
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        bottom: 0,
        left: -SCREEN_WIDTH,
        right: -SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    tabBarBackground: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
    },
    iconsRow: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        height: TAB_BAR_HEIGHT,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingBottom: 20, // SafeArea spacing
    },
    sideIcons: {
        flex: 1,
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
    },
    slidingIndicator: {
        position: 'absolute',
        top: 4, // 60px effective height, centered is 30, half of 52 is 26, 30-26=4
        height: 52,
        borderRadius: 26,
        backgroundColor: '#f4f4f5',
    },
    centerTabItem: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fabContainer: {
        position: 'absolute',
        top: -48, // Float half outside the tab bar
        left: (80 - 56) / 2, // 12
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        width: FAB_SIZE,
        height: FAB_SIZE,
        borderRadius: FAB_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
    },
    menuContainer: {
        flex: 1,
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 80, // Reduced since FAB shifts down
    },
    dragHandle: {
        width: 36,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#e4e4e7',
        alignSelf: 'center',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#f4f4f5',
        marginLeft: 76, // Align with the text, skipping the icon
        marginRight: 16,
    },
    menuItemPressed: {
        backgroundColor: '#f4f4f5',
    },
    menuIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f4f4f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#18181b',
        marginBottom: 2,
        letterSpacing: -0.2,
    },
    menuSubtitle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#a1a1aa',
    },
});
