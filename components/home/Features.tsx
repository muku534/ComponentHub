'use client';

import { motion } from 'framer-motion';
import { Clipboard, FileCode, Package, Palette, Smartphone, Shield } from 'lucide-react';
import { features } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
    Clipboard,
    FileCode,
    Package,
    Palette,
    Smartphone,
    Shield,
};

export default function Features() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            nativecn-ui
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Built for developers who want control, performance, and beautiful code.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative p-6 rounded-2xl border border-border bg-background hover:bg-muted/50 transition-all duration-300"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                    {/* Icon */}
                                    <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-border">
                                        <Icon className="w-6 h-6 text-blue-500" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
