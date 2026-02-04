'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Zap, Code2, Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NativeHapticsDoc() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("import { triggerSelectionHaptic } from './NativeHaptics';");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
        >
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    New Feature
                </div>
                <h1 className="text-4xl font-bold mb-4">Native Haptics</h1>
                <p className="text-xl text-muted-foreground">
                    A lightweight, zero-dependency implementation of haptic feedback using direct native code.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl border border-border bg-muted/20">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                        <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Zero Dependencies</h3>
                    <p className="text-sm text-muted-foreground">
                        No massive npm packages. Just pure, clean native code for iOS and Android.
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-muted/20">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                        <Smartphone className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Platform Native</h3>
                    <p className="text-sm text-muted-foreground">
                        Uses `UIImpactFeedbackGenerator` on iOS and `Vibrator` API on Android.
                    </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-muted/20">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                        <Code2 className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Type Safe</h3>
                    <p className="text-sm text-muted-foreground">
                        Full TypeScript support with easy-to-use helper functions.
                    </p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Installation</h2>
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                        <span className="text-xs text-slate-500 ml-2">Manual Setup</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">1</div>
                            <div>
                                <h4 className="font-medium text-slate-200 mb-1">Get the Code</h4>
                                <p className="text-sm text-slate-400 mb-2">Go to the component page and copy the source files.</p>
                                <Link href="/components/native-haptics" className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                                    View Source Code <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">2</div>
                            <div>
                                <h4 className="font-medium text-slate-200 mb-1">Add to Project</h4>
                                <p className="text-sm text-slate-400">
                                    Copy the files to their respective locations locally:
                                </p>
                                <ul className="mt-2 text-sm text-slate-400 list-disc list-inside space-y-1">
                                    <li>`NativeHaptics.ts` → `src/utils/` or `components/`</li>
                                    <li>iOS Files (`.swift`, `.m`) → `ios/YourApp/`</li>
                                    <li>Android Files (`.kt`) → `android/app/src/main/java/...`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Usage</h2>
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                        <span className="text-xs text-slate-500">How to use</span>
                        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <pre className="p-6 text-sm text-slate-300 overflow-x-auto">
                        <code>{`import { triggerSelectionHaptic, triggerImpact } from './NativeHaptics';

// Use on button press
const handlePress = () => {
    triggerSelectionHaptic(); // Light tap
    // perform action...
};

// Use for success feedback
const onSuccess = () => {
    triggerImpact('heavy'); // Heavy impact
};`}</code>
                    </pre>
                </div>
            </section>
        </motion.div>
    );
}
