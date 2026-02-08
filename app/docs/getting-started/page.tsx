'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Copy } from 'lucide-react';

export default function GettingStartedPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
                <p className="text-lg text-muted-foreground">
                    Start using nativecn-ui components in your React Native project.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6">Prerequisites</h2>
                    <div className="p-6 rounded-xl border border-border bg-muted/20">
                        <p className="text-muted-foreground mb-4">Before you begin, make sure you have working environment:</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'A React Native project (0.70+)',
                                'TypeScript configured',
                                'Basic React Native knowledge',
                                'Node.js 18+ installed'
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
                    <div className="p-6 rounded-xl border border-border bg-muted/20">
                        <p className="text-muted-foreground mb-4">
                            Installing a component is as simple as copying the code. For a detailed walkthrough, check out the{' '}
                            <Link href="/docs/installation" className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center gap-1">
                                Installation Guide <ArrowRight className="w-4 h-4" />
                            </Link>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            We generally recommend setting up your project structure and theme before adding your first component.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Example Usage</h2>
                    <p className="text-muted-foreground mb-6">
                        Here&apos;s a typical component structure. Notice how it uses standard React Native primitives.
                    </p>

                    <div className="relative rounded-xl border border-border bg-gray-950 overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono ml-2">components/ui/Button.tsx</span>
                            </div>
                            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-6 text-sm text-blue-100 overflow-x-auto font-mono leading-relaxed">
                            <code>{`import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, variant = 'primary' }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};`}</code>
                        </pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Recommended Structure</h2>
                    <p className="text-muted-foreground mb-6">
                        Keep your project organized by grouping generic UI components separate from business logic.
                    </p>

                    <div className="p-6 rounded-xl border border-border bg-gray-950 font-mono text-sm text-gray-300 shadow-md">
                        <pre>{`src/
├── components/
│   ├── ui/           # nativecn-ui components go here
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   └── ...
├── screens/
└── ...`}</pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">What&apos;s Next?</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Link href="/docs/installation" className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h3 className="font-semibold mb-1">Installation</h3>
                            <p className="text-xs text-muted-foreground">See detailed setup options</p>
                        </Link>
                        <Link href="/docs/customization" className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h3 className="font-semibold mb-1">Customization</h3>
                            <p className="text-xs text-muted-foreground">Theming and styling guides</p>
                        </Link>
                        <Link href="/components" className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h3 className="font-semibold mb-1">Browse Library</h3>
                            <p className="text-xs text-muted-foreground">Explore all components</p>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Link
                    href="/docs"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Introduction
                </Link>
                <Link
                    href="/docs/installation"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                >
                    Installation
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
