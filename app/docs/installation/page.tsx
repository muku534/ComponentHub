'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Copy, Terminal } from 'lucide-react';

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
                    Learn how to add ComponentHub components to your project.
                </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Installation Methods</h2>
                <p>
                    There are two ways to use ComponentHub components in your project:
                </p>

                <h3>Method 1: Copy & Paste (Recommended)</h3>
                <p>
                    The simplest way to use our components is to copy them directly into your project.
                    This gives you full ownership and control over the code.
                </p>
                <ol>
                    <li>Go to the <Link href="/components" className="text-blue-500 hover:underline">Components page</Link></li>
                    <li>Select the component you want to use</li>
                    <li>Click the &quot;Copy Code&quot; button</li>
                    <li>Create a new file in your project (e.g., <code>components/ui/Button.tsx</code>)</li>
                    <li>Paste the code and save</li>
                </ol>

                <h3>Method 2: Using the CLI (Coming Soon)</h3>
                <p>
                    We&apos;re working on a CLI tool that will make adding components even easier:
                </p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-gray-950 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-gray-900">
                            <Terminal className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Terminal</span>
                        </div>
                        <pre className="p-4 text-sm text-gray-300">
                            <code>{`# Coming soon!
npx componenthub add button
npx componenthub add card input modal`}</code>
                        </pre>
                    </div>
                </div>

                <h2>Optional Dependencies</h2>
                <p>
                    While our components are designed to be dependency-free, some components work
                    better with these optional packages:
                </p>

                <div className="not-prose my-6 space-y-4">
                    <div className="p-4 rounded-xl border border-border bg-muted/30">
                        <h4 className="font-semibold mb-2">For Animations</h4>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-950 font-mono text-sm text-gray-300">
                            <span className="text-blue-400">npm</span> install react-native-reanimated
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-muted/30">
                        <h4 className="font-semibold mb-2">For Gestures</h4>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-950 font-mono text-sm text-gray-300">
                            <span className="text-blue-400">npm</span> install react-native-gesture-handler
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-muted/30">
                        <h4 className="font-semibold mb-2">For SVG Icons</h4>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-950 font-mono text-sm text-gray-300">
                            <span className="text-blue-400">npm</span> install react-native-svg
                        </div>
                    </div>
                </div>

                <h2>TypeScript Configuration</h2>
                <p>
                    Our components are written in TypeScript. Make sure your <code>tsconfig.json</code>
                    includes the following settings for the best experience:
                </p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-muted/50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm text-muted-foreground">tsconfig.json</span>
                            <button className="p-1.5 rounded-md hover:bg-background transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                            <code>{`{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-native",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}</code>
                        </pre>
                    </div>
                </div>

                <h2>Troubleshooting</h2>
                <h3>TypeScript Errors</h3>
                <p>
                    If you see TypeScript errors after pasting a component, make sure:
                </p>
                <ul>
                    <li>Your React Native version is 0.70 or later</li>
                    <li>TypeScript is properly configured</li>
                    <li>Required peer dependencies are installed</li>
                </ul>

                <h3>Style Issues</h3>
                <p>
                    If styles don&apos;t look right, check that:
                </p>
                <ul>
                    <li>You&apos;ve updated the color values to match your theme</li>
                    <li>Font families are installed and configured</li>
                    <li>Screen density is accounted for</li>
                </ul>
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
