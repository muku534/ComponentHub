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
        <section className="py-32 px-4 bg-muted/30 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-20 text-center mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
                        Everything you need to build <span className="text-muted-foreground">native apps.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg px-4">
                        Carefully crafted React Native components designed for performance, accessibility, and exceptional developer experience.
                    </p>
                </motion.div>

                {/* Features Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        // Create asymmetrical layout
                        const isLarge = index === 0 || index === 3;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex ${isLarge ? 'md:col-span-2' : 'col-span-1'} group`}
                            >
                                <div className="w-full flex flex-col items-start p-10 rounded-[28px] bg-card border border-border/40 hover:border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 transform group-hover:-translate-y-1">
                                    <div className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-[14px] bg-muted border border-border/40 text-foreground group-hover:scale-110 group-hover:bg-background transition-all duration-500 shadow-sm">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-foreground tracking-tight">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed font-light">
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
