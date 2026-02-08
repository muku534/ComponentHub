'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Copy, Terminal, Check } from 'lucide-react';
import { useState } from 'react';

function DependencyCard({ title, description, command }: { title: string, description: string, command: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
                <h4 className="font-bold mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="relative bg-gray-950 rounded-lg border border-gray-800 flex items-center min-w-[280px]">
                <code className="flex-1 block text-gray-300 text-xs font-mono p-3 truncate pr-10">
                    {command}
                </code>
                <button
                    onClick={handleCopy}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                    title="Copy command"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
}

export default function InstallationPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Installation</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to add nativecn-ui components to your project.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6">Installation Methods</h2>
                    <div className="p-6 rounded-xl border-2 border-primary/20 bg-primary/5 relative overflow-hidden">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Copy className="w-5 h-5 text-primary" />
                            Copy & Paste Approach
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl">
                            The simplest way to use our components is to copy them directly into your project.
                            This gives you full ownership and control over the code.
                        </p>

                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50 items-start">
                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                                <div>
                                    <p className="text-sm font-medium">Browse Components</p>
                                    <p className="text-xs text-muted-foreground">Go to the <Link href="/components" className="text-blue-500 hover:underline">Components page</Link> and select a component.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50 items-start">
                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                                <div>
                                    <p className="text-sm font-medium">Copy Code</p>
                                    <p className="text-xs text-muted-foreground">Click the &quot;Copy Code&quot; button on the component detail page.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50 items-start">
                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                                <div>
                                    <p className="text-sm font-medium">Create File</p>
                                    <p className="text-xs text-muted-foreground">Create a file (e.g., <code className="bg-muted px-1 py-0.5 rounded text-foreground">components/ui/Button.tsx</code>) and paste the code.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Optional Dependencies</h2>
                    <p className="text-muted-foreground mb-6">
                        While our components are designed to be dependency-free, some complex interactions work better with these packages.
                    </p>
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Optional Dependencies</h2>
                        <p className="text-muted-foreground mb-6">
                            While our components are designed to be dependency-free, some complex interactions work better with these packages.
                        </p>
                        <div className="grid grid-cols-1 gap-6">
                            <DependencyCard
                                title="Animations"
                                description="For complex layout transitions"
                                command="npm i react-native-reanimated"
                            />
                            <DependencyCard
                                title="Gestures"
                                description="For swipeables and drag interactions"
                                command="npm i react-native-gesture-handler"
                            />
                            <DependencyCard
                                title="Vectors"
                                description="For SVG paths and icons"
                                command="npm i react-native-svg"
                            />
                        </div>
                    </section>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">TypeScript Configuration</h2>
                    <p className="text-muted-foreground mb-6">
                        Ensure your <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">tsconfig.json</code> has these settings for the best developer experience.
                    </p>

                    <div className="relative rounded-xl border border-border bg-gray-950 overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono ml-2">tsconfig.json</span>
                            </div>
                        </div>
                        <pre className="p-6 text-sm text-blue-100 overflow-x-auto font-mono leading-relaxed">
                            <code>{`{
  "compilerOptions": {
    "strict": true,            // Enable strict type checking
    "jsx": "react-native",     // Handle JSX validation
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]       // Optional: Path aliases
    }
  }
}`}</code>
                        </pre>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
                        <h3 className="font-bold text-red-600 dark:text-red-400 mb-3">Common Errors</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span>React Native version mismatch (ensure 0.70+)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                <span>Missing peer dependencies</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">Styling Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span>Check your font configuration</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                <span>Update constants.ts for your theme</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Link
                    href="/docs/getting-started"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Getting Started
                </Link>
                <Link
                    href="/docs/customization"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
                >
                    Customization
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
