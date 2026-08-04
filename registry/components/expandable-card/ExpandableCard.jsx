import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ScrollView, Modal, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate, Extrapolation, runOnJS, useAnimatedRef, } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const SPRING_CONFIG = {
    damping: 16,
    stiffness: 120,
    mass: 0.8,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};
export function ExpandableCardList({ data }) {
    const insets = useSafeAreaInsets();
    const [activeCard, setActiveCard] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const activeCardX = useSharedValue(0);
    const activeCardY = useSharedValue(0);
    const activeCardWidth = useSharedValue(0);
    const activeCardHeight = useSharedValue(0);
    const isExpanded = useSharedValue(0);
    const handlePressCard = (card, x, y, width, height) => {
        activeCardX.value = x;
        activeCardY.value = y;
        activeCardWidth.value = width;
        activeCardHeight.value = height;
        setActiveCard(card);
        setModalVisible(true);
        isExpanded.value = withSpring(1, SPRING_CONFIG);
    };
    const handleClose = () => {
        isExpanded.value = withTiming(0, { duration: 350 }, (finished) => {
            if (finished) {
                runOnJS(setActiveCard)(null);
                runOnJS(setModalVisible)(false);
            }
        });
    };
    const overlayStyle = useAnimatedStyle(() => {
        return {
            pointerEvents: isExpanded.value > 0 ? 'auto' : 'none',
        };
    });
    const activeCardStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: interpolate(isExpanded.value, [0, 1], [activeCardX.value, 0]),
            top: interpolate(isExpanded.value, [0, 1], [activeCardY.value, 0]),
            width: interpolate(isExpanded.value, [0, 1], [activeCardWidth.value, WINDOW_WIDTH]),
            height: interpolate(isExpanded.value, [0, 1], [activeCardHeight.value, WINDOW_HEIGHT]),
            borderRadius: interpolate(isExpanded.value, [0, 1], [24, 0]),
            overflow: 'hidden',
        };
    });
    const contentOpacityStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(isExpanded.value, [0.5, 1], [0, 1], Extrapolation.CLAMP),
            transform: [
                { translateY: interpolate(isExpanded.value, [0.5, 1], [20, 0], Extrapolation.CLAMP) }
            ]
        };
    });
    const closeButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(isExpanded.value, [0.8, 1], [0, 1], Extrapolation.CLAMP),
        };
    });
    return (<View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Today</Text>
        {data.map((card) => (<CardItem key={card.id} card={card} onPress={handlePressCard} hidden={activeCard?.id === card.id}/>))}
      </ScrollView>

      {/* FULL SCREEN OVERLAY */}
      <Modal transparent visible={modalVisible} onRequestClose={handleClose} animationType="none">
        {activeCard && (<Animated.View style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}>
            <Animated.View style={[styles.activeCard, activeCardStyle]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
              {/* Image Header */}
              <View style={styles.activeImageContainer}>
                <Image source={{ uri: activeCard.image }} style={styles.activeImage}/>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardCategory}>{activeCard.category}</Text>
                  <Text style={styles.cardTitle}>{activeCard.title}</Text>
                </View>
              </View>

              {/* Expanded Content */}
              <Animated.View style={[styles.expandedContent, contentOpacityStyle]}>
                <Text style={styles.expandedText}>{activeCard.content}</Text>
              </Animated.View>
            </ScrollView>
          </Animated.View>

            {/* Back Arrow Button */}
            <Animated.View style={[
                styles.closeButtonContainer,
                { top: insets.top || 20 },
                closeButtonStyle
            ]}>
              <Pressable style={styles.closeButton} onPress={handleClose}>
                <View style={styles.arrowLineMain}/>
                <View style={styles.arrowLineTop}/>
                <View style={styles.arrowLineBottom}/>
              </Pressable>
            </Animated.View>
          </Animated.View>)}
      </Modal>
    </View>);
}
// ─── INDIVIDUAL CARD ITEM ─────────────────────────────────────────────────────
function CardItem({ card, onPress, hidden }) {
    const animatedRef = useAnimatedRef();
    const handlePress = () => {
        if (!animatedRef.current)
            return;
        animatedRef.current.measure((x, y, width, height, pageX, pageY) => {
            onPress(card, pageX, pageY, width, height);
        });
    };
    return (<Pressable onPress={handlePress} style={{ opacity: hidden ? 0 : 1 }}>
      <Animated.View ref={animatedRef} style={styles.card}>
        <Image source={{ uri: card.image }} style={styles.cardImage}/>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardCategory}>{card.category}</Text>
          <Text style={styles.cardTitle}>{card.title}</Text>
        </View>
      </Animated.View>
    </Pressable>);
}
// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 20,
    },
    card: {
        height: 380,
        width: '100%',
        borderRadius: 24,
        marginBottom: 30,
        overflow: 'hidden',
        backgroundColor: '#1C1C1E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardImage: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardTextContainer: {
        position: 'absolute',
        top: 24,
        left: 24,
        right: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    cardCategory: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
    },
    // Overlay
    overlay: {
        zIndex: 1000,
    },
    activeCard: {
        backgroundColor: '#000',
    },
    activeImageContainer: {
        height: 380,
        width: '100%',
        overflow: 'hidden',
    },
    activeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    expandedContent: {
        padding: 24,
        paddingTop: 30,
    },
    expandedText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 17,
        lineHeight: 26,
    },
    closeButtonContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 1001,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    arrowLineMain: {
        position: 'absolute',
        width: 14,
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
    },
    arrowLineTop: {
        position: 'absolute',
        width: 8,
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
        left: 8,
        top: 11,
    },
    arrowLineBottom: {
        position: 'absolute',
        width: 8,
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
        left: 8,
        top: 19,
    },
});
