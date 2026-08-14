import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
    withSpring,
    Layout
} from 'react-native-reanimated';

const DEFAULT_COLORS = {
    background: '#FFFFFF',
    text: '#171717',
    textMuted: '#A3A3A3',
    primary: '#09090B',
    primaryText: '#FFFFFF',
    border: '#E5E5E5',
    inputBackground: '#FFFFFF',
};

const DatePicker = ({
    label,
    value,
    onDateChange,
    minimumDate,
    maximumDate,
    disabled = false,
    placeholder = 'Select Date',
    colors: customColors,
}) => {
    const COLORS = { ...DEFAULT_COLORS, ...customColors };
    const [expanded, setExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || null);
    const [viewDate, setViewDate] = useState(value || new Date());
    const [pickerMode, setPickerMode] = useState('date');
    const [yearPage, setYearPage] = useState(Math.floor((value?.getFullYear() || new Date().getFullYear()) / 12) * 12);

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            setViewDate(value);
            setYearPage(Math.floor(value.getFullYear() / 12) * 12);
        }
    }, [value]);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        let day = new Date(year, month, 1).getDay();
        return day;
    };

    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const shortMonthNames = monthNames.map(m => m.substring(0, 3));
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const handlePrev = () => {
        if (pickerMode === 'date') {
            setViewDate(new Date(currentYear, currentMonth - 1, 1));
        } else if (pickerMode === 'month') {
            setViewDate(new Date(currentYear - 1, currentMonth, 1));
        } else if (pickerMode === 'year') {
            setYearPage(yearPage - 12);
        }
    };

    const handleNext = () => {
        if (pickerMode === 'date') {
            setViewDate(new Date(currentYear, currentMonth + 1, 1));
        } else if (pickerMode === 'month') {
            setViewDate(new Date(currentYear + 1, currentMonth, 1));
        } else if (pickerMode === 'year') {
            setYearPage(yearPage + 12);
        }
    };

    const handleDaySelect = (day) => {
        const newDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(newDate);
    };

    const handleConfirm = () => {
        if (selectedDate) {
            onDateChange?.(selectedDate);
        }
        setExpanded(false);
        setPickerMode('date');
    };

    const isDateDisabled = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (minimumDate && date < minimumDate) return true;
        if (maximumDate && date > maximumDate) return true;
        return false;
    };

    const progress = useDerivedValue(() => withSpring(expanded ? 1 : 0, { 
        damping: 24, 
        stiffness: 200, 
        mass: 0.8 
    }));
    
    const chevronStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${progress.value * 180}deg` }]
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                [COLORS.inputBackground, COLORS.background]
            ),
            borderColor: COLORS.border,
            borderWidth: 1,
            borderRadius: expanded ? 24 : 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: expanded ? 8 : 2 },
            shadowOpacity: expanded ? 0.1 : 0.02,
            shadowRadius: expanded ? 20 : 4,
            elevation: expanded ? 8 : 1,
        };
    });

    const renderCalendarIcon = (color) => (
        <View style={[styles.calendarIcon, { borderColor: color }]}>
            <View style={[styles.calendarIconTop, { backgroundColor: color }]} />
            <View style={styles.calendarIconGrid}>
                <View style={[styles.calendarIconDot, { backgroundColor: color }]} />
                <View style={[styles.calendarIconDot, { backgroundColor: color }]} />
                <View style={[styles.calendarIconDot, { backgroundColor: color }]} />
            </View>
        </View>
    );

    const renderChevron = (color) => (
        <Animated.View style={[styles.chevronContainer, chevronStyle]}>
            <View style={[styles.chevron, { borderColor: color }]} />
        </Animated.View>
    );

    const renderHeader = () => {
        let centerContent;
        if (pickerMode === 'date') {
            centerContent = (
                <View style={styles.headerCenter}>
                    <TouchableOpacity onPress={() => setPickerMode('month')} activeOpacity={0.6}>
                        <Text style={[styles.headerTitle, { color: COLORS.text }]}>{monthNames[currentMonth]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setYearPage(Math.floor(currentYear / 12) * 12); setPickerMode('year'); }} activeOpacity={0.6}>
                        <Text style={[styles.headerTitle, { color: COLORS.text, fontWeight: '500' }]}>{currentYear}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (pickerMode === 'month') {
            centerContent = (
                <View style={styles.headerCenter}>
                    <TouchableOpacity onPress={() => { setYearPage(Math.floor(currentYear / 12) * 12); setPickerMode('year'); }} activeOpacity={0.6}>
                        <Text style={[styles.headerTitle, { color: COLORS.text }]}>{currentYear}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            centerContent = (
                <View style={styles.headerCenter}>
                    <Text style={[styles.headerTitle, { color: COLORS.text }]}>{yearPage} - {yearPage + 11}</Text>
                </View>
            );
        }

        return (
            <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={handlePrev} style={styles.navButton} activeOpacity={0.6}>
                    <Text style={[styles.navTextIcon, { color: COLORS.text }]}>{"<"}</Text>
                </TouchableOpacity>
                {centerContent}
                <TouchableOpacity onPress={handleNext} style={styles.navButton} activeOpacity={0.6}>
                    <Text style={[styles.navTextIcon, { color: COLORS.text }]}>{">"}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderDateGrid = () => {
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const isSelected = selectedDate?.getDate() === i &&
                selectedDate?.getMonth() === currentMonth &&
                selectedDate?.getFullYear() === currentYear;
            const isDisabled = isDateDisabled(i);

            days.push(
                <TouchableOpacity
                    key={`day-${i}`}
                    style={styles.dayCell}
                    onPress={() => !isDisabled && handleDaySelect(i)}
                    disabled={isDisabled}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.dayCellInner,
                        isSelected && { backgroundColor: COLORS.primary }
                    ]}>
                        <Text style={[
                            styles.dayText,
                            { color: isSelected ? COLORS.primaryText : COLORS.text },
                            isDisabled && { color: COLORS.textMuted, opacity: 0.3 }
                        ]}>
                            {i}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <Animated.View entering={FadeIn} style={styles.gridContainer}>
                <View style={styles.daysRow}>
                    {dayNames.map((day, idx) => (
                        <View key={idx} style={styles.dayNameCell}>
                            <Text style={[styles.dayNameText, { color: COLORS.textMuted }]}>{day}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.grid}>
                    {days}
                </View>
            </Animated.View>
        );
    };

    const renderMonthGrid = () => {
        return (
            <Animated.View entering={FadeIn} style={[styles.gridContainer, styles.selectorGrid]}>
                {shortMonthNames.map((month, idx) => {
                    const isSelected = currentMonth === idx;
                    return (
                        <TouchableOpacity
                            key={idx}
                            style={styles.selectorCell}
                            onPress={() => {
                                setViewDate(new Date(currentYear, idx, 1));
                                setPickerMode('date');
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.selectorCellInner,
                                isSelected && { backgroundColor: COLORS.primary }
                            ]}>
                                <Text style={[styles.selectorText, { color: isSelected ? COLORS.primaryText : COLORS.text }]}>{month}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Animated.View>
        );
    };

    const renderYearGrid = () => {
        const years = Array.from({ length: 12 }).map((_, i) => yearPage + i);
        return (
            <Animated.View entering={FadeIn} style={[styles.gridContainer, styles.selectorGrid]}>
                {years.map((year, idx) => {
                    const isSelected = currentYear === year;
                    return (
                        <TouchableOpacity
                            key={idx}
                            style={styles.selectorCell}
                            onPress={() => {
                                setViewDate(new Date(year, currentMonth, 1));
                                setPickerMode('date');
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.selectorCellInner,
                                isSelected && { backgroundColor: COLORS.primary }
                            ]}>
                                <Text style={[styles.selectorText, { color: isSelected ? COLORS.primaryText : COLORS.text }]}>{year}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </Animated.View>
        );
    };

    return (
        <View style={styles.wrapper}>
            {label && <Text style={[styles.inputLabel, { color: COLORS.text }]}>{label}</Text>}
            <Animated.View 
                layout={LinearTransition.springify().damping(24).stiffness(200).mass(0.8)}
                style={[
                    styles.container,
                    containerStyle,
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.inputContainer,
                        disabled && styles.disabledContainer
                    ]}
                    onPress={() => {
                        if (!disabled) {
                            setExpanded(!expanded);
                            if (!expanded) setPickerMode('date');
                        }
                    }}
                    disabled={disabled}
                    activeOpacity={1}
                >
                    <View style={styles.inputLeft}>
                        {renderCalendarIcon(selectedDate ? COLORS.text : COLORS.textMuted)}
                        <Text style={[styles.inputText, { color: selectedDate ? COLORS.text : COLORS.textMuted, fontWeight: selectedDate ? '500' : '400' }]}>
                            {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : placeholder}
                        </Text>
                    </View>
                    {renderChevron(COLORS.textMuted)}
                </TouchableOpacity>
                
                {expanded && (
                    <Animated.View entering={FadeIn.duration(200).delay(50)} style={styles.calendarContainer}>
                        {renderHeader()}
                        
                        {pickerMode === 'date' && renderDateGrid()}
                        {pickerMode === 'month' && renderMonthGrid()}
                        {pickerMode === 'year' && renderYearGrid()}

                        {selectedDate && (
                            <Animated.View entering={FadeIn.duration(200)} layout={LinearTransition.springify().damping(24).stiffness(200)} style={{ width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={[styles.confirmButton, { backgroundColor: COLORS.primary }]}
                                    onPress={handleConfirm}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.confirmButtonText, { color: COLORS.primaryText }]}>Confirm</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
        width: '100%',
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.2,
        marginLeft: 4,
    },
    container: {
        overflow: 'hidden',
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: 16,
        width: '100%',
    },
    inputLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disabledContainer: {
        opacity: 0.6,
    },
    inputText: {
        fontSize: 16,
        letterSpacing: 0.1,
    },
    calendarIcon: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        overflow: 'hidden',
        marginRight: 12,
    },
    calendarIconTop: {
        width: '100%',
        height: 5,
    },
    calendarIconGrid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    calendarIconDot: {
        width: 2,
        height: 2,
        borderRadius: 1,
    },
    chevronContainer: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevron: {
        width: 10,
        height: 10,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        transform: [{ rotate: '45deg' }, { translateY: -2 }, { translateX: -2 }],
    },
    calendarContainer: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        width: '100%',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        marginTop: 8,
        paddingHorizontal: 4,
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    navButton: {
        width: 32,
        height: 32,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTextIcon: {
        fontSize: 14,
        fontWeight: '600',
        color: '#171717',
    },
    gridContainer: {
        width: '100%',
    },
    daysRow: {
        flexDirection: 'row',
        marginBottom: 12,
        width: '100%',
    },
    dayNameCell: {
        width: '14.28%',
        alignItems: 'center',
    },
    dayNameText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    dayCell: {
        width: '14.28%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCellInner: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 16,
        fontWeight: '500',
    },
    selectorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 12,
        gap: 12,
    },
    selectorCell: {
        width: '30%',
        aspectRatio: 2.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectorCellInner: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectorText: {
        fontSize: 15,
        fontWeight: '600',
    },
    confirmButton: {
        marginTop: 16,
        marginBottom: 8,
        height: 48,
        width: '100%',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DatePicker;
