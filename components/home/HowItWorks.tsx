'use client';

import { motion } from 'framer-motion';
import { Search, Copy, Rocket } from 'lucide-react';

const steps = [
    {
        number: '1',
        title: 'Browse',
        description: 'Explore our collection of premium React Native components.',
        icon: Search,
    },
    {
        number: '2',
        title: 'Copy',
        description: 'Select a component and copy the code to your clipboard.',
        icon: Copy,
    },
    {
        number: '3',
        title: 'Paste',
        description: 'Paste into your project and customize to your needs.',
        icon: Rocket,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-4 bg-background border-b border-border">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
                        No npm install. No vendor lock-in.
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We provide the raw source code. You own it completely.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-border z-0" />
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 bg-background border border-border shadow-sm rounded-full flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto text-sm">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
