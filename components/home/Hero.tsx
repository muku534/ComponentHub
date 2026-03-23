'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Star, ArrowRight } from 'lucide-react';
import HeroShowcase from './HeroShowcase';
import { CliCommand } from './CliCommand';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-background">
            {/* Very subtle background pattern */}
            <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />

            <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">

                {/* Badge -> Trust Signal */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-muted/20 text-xs font-medium text-muted-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm"
                >
                    <Star className="w-3.5 h-3.5 text-yellow-500/80" fill="currentColor" />
                    <span className="tracking-wide">Trusted by developers worldwide</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-[-0.02em] text-foreground max-w-5xl leading-[1.05]"
                >
                    Production-ready React Native components <br className="hidden lg:block" />
                    <span className="text-muted-foreground">you actually own.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-[1.6] font-light tracking-[-0.01em]"
                >
                    Zero dependencies. Zero lock-in. A curated collection of meticulously designed components you can copy and paste directly into your project.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
                >
                    <Link
                        href="/studio/builder"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-full font-medium text-sm transition-all hover:bg-foreground/90 hover:scale-[1.02] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_4px_14px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                    >
                        Try Studio Builder
                    </Link>
                    <Link
                        href="/components"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-border/40 rounded-full font-medium text-sm transition-all hover:bg-muted/40 text-foreground hover:border-border/80 active:scale-[0.98]"
                    >
                        Browse Components
                    </Link>
                </motion.div>

                {/* CLI Command Preview - Commented out for now as npm package is not available */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="mt-12"
                >
                    <CliCommand />
                </motion.div> */}


                {/* Visual Anchor: The Component Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
                    className="w-full relative z-10"
                >
                    <HeroShowcase />
                    {/* Fading mask at the bottom to blend it into the page seamlessly */}
                    <div className="absolute -bottom-24 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />
                </motion.div>
            </div>
        </section >
    );
}
