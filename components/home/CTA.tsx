'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTA() {
    return (
        <section className="py-20 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-purple-600/50 to-pink-600/50 rounded-3xl opacity-50" />

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    {/* Content */}
                    <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                            <Zap className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium text-white">Start building today</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to build{' '}
                            <span className="underline decoration-4 decoration-white/50 underline-offset-8">
                                beautiful apps
                            </span>
                            ?
                        </h2>

                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join thousands of developers who ship faster with ComponentHub.
                            No subscriptions, no lock-in. Just great components.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/components"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <Link
                                href="/docs"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                            >
                                View Documentation
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
