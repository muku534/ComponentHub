import React from 'react';
import { Switch, StyleSheet, View, Text, SwitchProps, Dimensions, ViewStyle } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const wp = (percentage: number) => (percentage * SCREEN_WIDTH) / 100;

const DEFAULT_COLORS = {
    darkgray: '#374151',
    gray: '#9CA3AF',
    white: '#FFFFFF',
    Midgray: '#9CA3AF',
};

interface SwitchToggleProps extends SwitchProps {
    label?: string;
    onColor?: string;
    offColor?: string;
    thumbOnColor?: string;
    thumbOffColor?: string;
    style?: ViewStyle;
}

const SwitchToggle = ({
    label,
    value,
    onValueChange,
    onColor = DEFAULT_COLORS.darkgray,
    offColor = DEFAULT_COLORS.gray,
    thumbOnColor = DEFAULT_COLORS.white,
    thumbOffColor = DEFAULT_COLORS.Midgray,
    style,
    ...props
}: SwitchToggleProps) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: offColor, true: onColor }}
                thumbColor={value ? thumbOnColor : thumbOffColor}
                style={[styles.switch, style]}
                // iOS scale assumption
                ios_backgroundColor={offColor}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Default to spaced out if label is present
    },
    label: {
        fontSize: wp(4),
        color: DEFAULT_COLORS.darkgray,
        marginRight: wp(3),
    },
    switch: {
        // transform: [{ scale: 0.9 }], // Optional scaling
    }
});

export default SwitchToggle;
