'use client';

import { motion } from 'framer-motion';
import { Bell, Rss } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Tutorials, updates, and insights about React Native development.
                    </p>
                </motion.div>

                {/* Coming Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center py-20"
                >
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30" />
                        <div className="relative p-8 rounded-3xl border border-border bg-muted/30">
                            <Rss className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                            <p className="text-muted-foreground max-w-md">
                                We&apos;re working on amazing content for you. Check back soon for tutorials,
                                best practices, and updates about nativecn-ui.
                            </p>
                        </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="mt-12 p-8 rounded-2xl border border-border bg-muted/30 max-w-lg mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Bell className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold">Get Notified</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6">
                            Subscribe to be the first to know when we publish new content.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
