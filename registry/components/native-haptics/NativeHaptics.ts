import { NativeModules, Platform } from 'react-native';

const { Haptics } = NativeModules;

// Safety check
if (!Haptics) {
    console.warn('[Haptics] Native module not linked');
}

// Low-level wrappers
const impact = (style: 'light' | 'medium' | 'heavy' | 'soft' | 'rigid' = 'medium') => {
    Haptics?.impact(style);
};

const selection = () => {
    Haptics?.selection();
};

const notification = (type: 'success' | 'warning' | 'error' = 'success') => {
    Haptics?.notification(type);
};

// Utils
export const triggerHaptic = () => {
    // subtle feedback (welcome icons, light UI)
    impact(Platform.OS === 'ios' ? 'soft' : 'light');
};

export const triggerSelectionHaptic = () => {
    // perfect for tabs, pickers
    selection();
};

export const triggerMediumHaptic = () => {
    // buttons, bottom nav, primary actions
    impact('medium');
};

export const triggerSuccessHaptic = () => {
    notification('success');
};

export const triggerErrorHaptic = () => {
    notification('error');
};
