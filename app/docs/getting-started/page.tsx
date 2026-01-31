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
                    Start using ComponentHub components in your React Native project.
                </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Prerequisites</h2>
                <p>Before you begin, make sure you have:</p>
                <ul>
                    <li>A React Native project (0.70 or later recommended)</li>
                    <li>TypeScript configured in your project</li>
                    <li>Basic familiarity with React Native components</li>
                </ul>

                <h2>Quick Start</h2>
                <p>Getting started with ComponentHub is simple:</p>

                <div className="not-prose my-6">
                    <div className="space-y-4">
                        {[
                            { step: 1, title: 'Browse Components', desc: 'Visit the components page and find what you need' },
                            { step: 2, title: 'Copy the Code', desc: 'Click the copy button to copy the component code' },
                            { step: 3, title: 'Create File', desc: 'Create a new file in your components folder' },
                            { step: 4, title: 'Paste & Customize', desc: 'Paste the code and adjust styles to match your design' },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/30">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2>Example: Using the Button Component</h2>
                <p>Here&apos;s a quick example of how to use a ComponentHub button:</p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-muted/50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm text-muted-foreground">Button.tsx</span>
                            <button className="p-1.5 rounded-md hover:bg-background transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
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
                </div>

                <h2>Recommended Folder Structure</h2>
                <p>We recommend organizing your components like this:</p>

                <div className="not-prose my-6 p-4 rounded-xl border border-border bg-muted/30 font-mono text-sm">
                    <pre>{`src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── index.ts
│   └── ...
├── screens/
└── ...`}</pre>
                </div>

                <h2>What&apos;s Next?</h2>
                <p>Now that you know the basics:</p>
                <ul>
                    <li>
                        <Link href="/docs/installation" className="text-blue-500 hover:underline">
                            Learn about installation options
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/customization" className="text-blue-500 hover:underline">
                            Customize components to match your design
                        </Link>
                    </li>
                    <li>
                        <Link href="/components" className="text-blue-500 hover:underline">
                            Browse all available components
                        </Link>
                    </li>
                </ul>
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
