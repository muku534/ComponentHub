import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const wp = (percentage: number) => (percentage * SCREEN_WIDTH) / 100;
const hp = (percentage: number) => (percentage * SCREEN_HEIGHT) / 100;

const DEFAULT_COLORS = {
    white: '#FFFFFF',
    Black: '#000000',
    darkgray: '#374151',
    WhiteSmoke: '#F5F5F5',
};

export interface BottomSheetRef {
    open: () => void;
    close: () => void;
}

interface DynamicBottomSheetProps {
    visible?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    height?: number | string;
    backgroundColor?: string;
    style?: ViewStyle;
}

const DynamicBottomSheet = forwardRef<BottomSheetRef, DynamicBottomSheetProps>(
    ({
        visible: propVisible,
        onClose,
        children,
        height = hp(80),
        backgroundColor,
        style
    }, ref) => {
        const COLORS = DEFAULT_COLORS;
        const [visible, setVisible] = useState(!!propVisible);
        const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

        useEffect(() => {
            if (propVisible !== undefined) {
                if (propVisible) open();
                else close();
            }
        }, [propVisible]);

        const open = () => {
            setVisible(true);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                friction: 10,
                tension: 40
            }).start();
        };

        const close = () => {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                onClose?.();
            });
        };

        useImperativeHandle(ref, () => ({
            open,
            close
        }));

        if (!visible) return null;

        return (
            <Modal
                transparent
                visible={visible}
                animationType="none"
                onRequestClose={close}
            >
                <View style={styles.overlay}>
                    {/* Backdrop Tap to Close */}
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        onPress={close}
                        activeOpacity={1}
                    />

                    {/* Sheet Content */}
                    <Animated.View
                        style={[
                            styles.sheetContainer,
                            {
                                height: typeof height === 'number' ? height : undefined, // Allow flex if not number
                                maxHeight: SCREEN_HEIGHT * 0.95,
                                transform: [{ translateY: slideAnim }],
                                backgroundColor: backgroundColor || COLORS.white
                            },
                            style
                        ]}
                    >
                        {/* Handle Bar */}
                        <View style={styles.handleContainer}>
                            <View style={[styles.handleBar, { backgroundColor: COLORS.WhiteSmoke }]} />
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            {children}
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        width: '100%',
        bottom: 0,
        position: 'absolute',
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handleBar: {
        width: 60,
        height: 5,
        borderRadius: 2.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
    }
});

export default DynamicBottomSheet;
