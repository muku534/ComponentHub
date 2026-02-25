'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedGradientText = ({
    text,
    className = '',
}: {
    text: string;
    className?: string;
}) => {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`inline-block animate-text-gradient bg-gradient-to-r from-neutral-100 via-neutral-500 to-neutral-100 bg-[200%_auto] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-100 ${className}`}
        >
            {text}
        </motion.span>
    );
};
