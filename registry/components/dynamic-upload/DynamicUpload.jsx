import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  useColorScheme,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  Easing,
  interpolate,
  Extrapolation,
  withSequence,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- Constants ---
const SPRING_CONFIG = { damping: 18, stiffness: 150 };
const COLORS = {
  primary: '#605BFF',      // Blue/Purple for uploading
  primaryBg: '#EEF0FF',    // Light background for uploading
  pausedText: '#A1A1AA',   // Grey for paused text
  pausedBar: '#52525B',    // Dark grey for paused bar
  success: '#10B981',      // Green for success
  error: '#EF4444',        // Red for error / delete
  errorBg: '#FEE2E2',      // Light red for delete button bg
  border: '#E4E4E7',
  textMain: '#18181B',
  textSub: '#71717A',
  bgButton: '#F4F4F5',
};

// --- Helper Components ---
const FileIcon = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={styles.iconContainer}>
      {/* Folded corner effect */}
      <View style={[styles.iconFold, isDark && { backgroundColor: '#18181B' }]} />

      <View style={styles.gridIcon}>
        <View style={styles.gridSquare} />
        <View style={styles.gridSquare} />
        <View style={styles.gridSquare} />
        <View style={styles.gridSquare} />
      </View>
      <Text style={styles.iconText}>XLSX</Text>
    </View>
  );
};

export function DynamicUpload({
  fileName = 'create-ui.xlsx',
  fileSize = '2.2MB',
  totalSize = '2.3MB',
  onDelete,
  onChange,
  onDownload,
}) {
  const isDark = useColorScheme() === 'dark';
  const [status, setStatus] = useState('uploading');
  const [progressText, setProgressText] = useState(0);

  // Reanimated Shared Values
  const progress = useSharedValue(0.02); // Start with a tiny bit of progress
  // statusState maps to: 1=uploading, 2=paused, 3=success
  const statusState = useSharedValue(1);

  // Simulate upload progress for the demo
  useEffect(() => {
    let interval;

    if (status === 'uploading') {
      statusState.value = withTiming(1, { duration: 300 });

      interval = setInterval(() => {
        if (progress.value >= 1) {
          clearInterval(interval);
          setStatus('success');
          return;
        }
        // Random increment between 2% and 8%
        const inc = Math.random() * 0.08 + 0.02;
        let newProgress = progress.value + inc;
        if (newProgress > 1) newProgress = 1;

        progress.value = withTiming(newProgress, { duration: 400, easing: Easing.out(Easing.ease) });
        setProgressText(Math.floor(newProgress * 100));
      }, 600);

    } else if (status === 'paused') {
      statusState.value = withTiming(2, { duration: 300 });
      clearInterval(interval);

    } else if (status === 'success') {
      statusState.value = withTiming(3, { duration: 400 });
      progress.value = withTiming(1, { duration: 300 });
      setProgressText(100);
    } else if (status === 'idle') {
      statusState.value = withTiming(1);
      progress.value = 0.02;
      setProgressText(0);
      setStatus('uploading'); // Auto restart for demo
    }

    return () => clearInterval(interval);
  }, [status]);

  // --- Animated Styles ---

  // The background fills up to the progress width and changes color based on status
  const bgFillStyle = useAnimatedStyle(() => {
    const lightColors = ['#E0F2FE', '#F3F4F6', '#DCFCE7'];
    const darkColors = ['#172554', '#27272A', '#022C22']; // blue-950, zinc-800, emerald-950
    return {
      width: `${progress.value * 100}%`,
      backgroundColor: interpolateColor(
        statusState.value,
        [1, 2, 3],
        isDark ? darkColors : lightColors
      ),
    };
  }, [isDark]);

  // Fade in the success checkmark
  const successIconStyle = useAnimatedStyle(() => {
    return {
      opacity: statusState.value === 3 ? withTiming(1) : withTiming(0),
      transform: [
        { scale: statusState.value === 3 ? withSpring(1, SPRING_CONFIG) : withTiming(0.5) }
      ],
      width: statusState.value === 3 ? withTiming(20) : withTiming(0),
      marginRight: statusState.value === 3 ? withTiming(6) : withTiming(0),
    };
  });

  // --- Handlers ---
  const togglePause = () => {
    if (status === 'uploading') setStatus('paused');
    else if (status === 'paused') setStatus('uploading');
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  // Calculate simulated downloaded MB
  const currentMB = (Number(totalSize.replace('MB', '')) * (progressText / 100)).toFixed(1);

  return (
    <View style={[
      styles.cardContainer,
      isDark && { backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)' }
    ]}>

      {/* Uploading glowing background */}
      <Animated.View style={[styles.bgFill, bgFillStyle]} />

      <View style={styles.contentRow}>
        <FileIcon />

        <View style={styles.infoContainer}>
          <Text style={[styles.fileName, isDark && { color: '#FAFAFA' }]}>{fileName}</Text>

          <View style={styles.progressRow}>
            {/* Success Checkmark */}
            <Animated.View style={[styles.successCheckContainer, successIconStyle]}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            </Animated.View>

            {/* Dynamic Status Text */}
            <Text style={[
              styles.progressStatus, 
              { color: status === 'paused' ? '#A1A1AA' : (isDark ? '#818CF8' : COLORS.primary) }
            ]}>
              {status === 'success' ? '100%' : `${progressText}%`}
            </Text>

            <Text style={styles.sizeText}>
              {' • '}
              {status === 'success' ? totalSize : `${currentMB} MB of ${totalSize}`}
            </Text>
          </View>
        </View>

        {/* Right Side Controls */}
        <View style={styles.rightControls}>
          {status !== 'success' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Pressable style={[
                styles.controlBtnRound,
                isDark && { backgroundColor: '#27272A', borderColor: '#3F3F46' }
              ]} onPress={togglePause}>
                {status === 'paused' ? (
                  <View style={[styles.playIcon, isDark && { borderLeftColor: '#E4E4E7' }]} />
                ) : (
                  <View style={styles.pauseIconRow}>
                    <View style={[styles.pauseBar, isDark && { backgroundColor: '#E4E4E7' }]} />
                    <View style={[styles.pauseBar, isDark && { backgroundColor: '#E4E4E7' }]} />
                  </View>
                )}
              </Pressable>

              <Pressable style={[
                styles.controlBtnRound,
                isDark && { backgroundColor: '#27272A', borderColor: '#3F3F46' }
              ]} onPress={handleCancel}>
                <Text style={[styles.cancelText, isDark && { color: '#E4E4E7' }]}>✕</Text>
              </Pressable>
            </View>
          )}

          {status === 'success' && (
            <Pressable style={[
              styles.deleteBtn,
              isDark && { backgroundColor: '#450A0A', borderColor: '#7F1D1D' }
            ]} onPress={handleCancel}>
              {/* Simple SVG/View representation of trash icon */}
              <View style={styles.trashIcon}>
                <View style={[styles.trashLid, isDark && { backgroundColor: '#FCA5A5' }]} />
                <View style={[styles.trashBody, isDark && { borderColor: '#FCA5A5' }]}>
                  <View style={[styles.trashLine, isDark && { backgroundColor: '#FCA5A5' }]} />
                  <View style={[styles.trashLine, isDark && { backgroundColor: '#FCA5A5' }]} />
                </View>
              </View>
            </Pressable>
          )}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  bgFill: {
    ...StyleSheet.absoluteFill,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 84, // Fixed height for the main content row
  },
  iconContainer: {
    width: 44,
    height: 52,
    backgroundColor: '#059669', // Elegant emerald
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  iconFold: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    // Pure CSS triangle equivalent for the fold
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  gridIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 18,
    height: 18,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginTop: 2,
    marginBottom: 4,
  },
  gridSquare: {
    width: 7,
    height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 2,
  },
  iconText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  // --- Info Styles ---
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 60,
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27272A',
    marginBottom: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A1A1AA',
  },
  // --- Success Icon ---
  successCheckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // --- Right Controls ---
  rightControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtnRound: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F4F4F5',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#52525B',
  },
  pauseIconRow: {
    flexDirection: 'row',
    gap: 3,
  },
  pauseBar: {
    width: 3,
    height: 12,
    backgroundColor: '#52525B',
    borderRadius: 2,
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: '#52525B',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 3,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  trashIcon: {
    width: 14,
    height: 16,
    alignItems: 'center',
  },
  trashLid: {
    width: 14,
    height: 2,
    backgroundColor: '#EF4444',
    borderRadius: 1,
    marginBottom: 2,
  },
  trashBody: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#EF4444',
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 2,
  },
  trashLine: {
    width: 1.5,
    height: 6,
    backgroundColor: '#EF4444',
    borderRadius: 1,
  },
});
