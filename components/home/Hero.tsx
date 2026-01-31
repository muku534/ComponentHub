'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"
                    style={{ animation: 'float 6s ease-in-out infinite' }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
                    style={{ animation: 'float 6s ease-in-out infinite 2s' }}
                />
                <div
                    className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-pink-500/15 dark:bg-pink-500/5 rounded-full blur-3xl"
                    style={{ animation: 'float 6s ease-in-out infinite 4s' }}
                />
            </div>

            <div className="max-w-7xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8"
                >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">9 Production-Ready Components</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                >
                    <span className="block">Copy.</span>
                    <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Paste.
                    </span>
                    <span className="block">Ship.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Premium React Native components you own. No package bloat.
                    Just beautiful, performant code.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/components"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
                    >
                        Browse Components
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/docs"
                        className="inline-flex items-center justify-center px-8 py-4 bg-muted hover:bg-muted/80 border border-border rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                    >
                        Read Docs
                    </Link>
                </motion.div>

                {/* Code Preview Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 max-w-4xl mx-auto"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30" />

                        {/* Code window */}
                        <div className="relative bg-background/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-2xl">
                            {/* Window header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <span className="text-sm text-muted-foreground ml-2">Button.tsx</span>
                            </div>

                            {/* Code content */}
                            <div className="p-6 text-left font-mono text-sm leading-relaxed overflow-x-auto">
                                <pre className="text-muted-foreground">
                                    <code>
                                        <span className="text-purple-500">import</span>{" "}
                                        <span className="text-foreground">{"{ TouchableOpacity, Text }"}</span>{" "}
                                        <span className="text-purple-500">from</span>{" "}
                                        <span className="text-green-500">&apos;react-native&apos;</span>;
                                        {"\n\n"}
                                        <span className="text-purple-500">export const</span>{" "}
                                        <span className="text-blue-500">Button</span> = {"({ "}
                                        <span className="text-orange-500">title</span>,{" "}
                                        <span className="text-orange-500">onPress</span>
                                        {" }) => (\n"}
                                        {"  "}<span className="text-blue-500">{"<TouchableOpacity"}</span>{" "}
                                        <span className="text-orange-500">onPress</span>={"{"}<span className="text-foreground">onPress</span>{"}"}{">"}
                                        {"\n    "}<span className="text-blue-500">{"<Text>"}</span>{"{"}<span className="text-foreground">title</span>{"}"}
                                        <span className="text-blue-500">{"</Text>"}</span>
                                        {"\n  "}<span className="text-blue-500">{"</TouchableOpacity>"}</span>
                                        {"\n)"}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
