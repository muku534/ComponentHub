'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="py-24 px-4 border-t border-border bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        Start building today
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Stop reinventing the wheel. Use nativecn-ui to ship beautiful React Native applications faster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/components"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-md font-medium text-sm transition-colors hover:bg-primary/90 shadow-sm"
                        >
                            Browse Components
                        </Link>
                        <Link
                            href="/docs"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-background border border-input rounded-md font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground shadow-sm"
                        >
                            Read Documentation
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
