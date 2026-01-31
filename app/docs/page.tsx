'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Book, Rocket, Settings, Sparkles } from 'lucide-react';

const quickLinks = [
    {
        icon: Rocket,
        title: 'Getting Started',
        description: 'Set up ComponentHub in your project in minutes.',
        href: '/docs/getting-started',
    },
    {
        icon: Book,
        title: 'Installation',
        description: 'Learn how to install and configure components.',
        href: '/docs/installation',
    },
    {
        icon: Settings,
        title: 'Customization',
        description: 'Customize components to match your design system.',
        href: '/docs/customization',
    },
];

export default function DocsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm mb-4">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    Documentation
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ComponentHub
                    </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to use our premium React Native components to build beautiful mobile apps.
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 mb-12">
                {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <motion.div
                            key={link.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted transition-all duration-200"
                            >
                                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-border">
                                    <Icon className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-1">{link.title}</h3>
                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Overview */}
            <section className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Overview</h2>
                <p>
                    ComponentHub is a collection of premium React Native UI components designed for
                    developers who want full control over their code. Unlike traditional component
                    libraries, we use a copy-paste approach – you copy the components into your
                    project and customize them to your needs.
                </p>

                <h3>Why ComponentHub?</h3>
                <ul>
                    <li><strong>Zero Dependencies</strong> – No external runtime packages to manage</li>
                    <li><strong>Full Ownership</strong> – The code is yours to modify and extend</li>
                    <li><strong>TypeScript First</strong> – Complete type definitions for everything</li>
                    <li><strong>Production Ready</strong> – Battle-tested in real applications</li>
                </ul>

                <h3>How It Works</h3>
                <ol>
                    <li>Browse our collection of components</li>
                    <li>Copy the component code to your clipboard</li>
                    <li>Paste it into your project</li>
                    <li>Customize the styling and behavior</li>
                </ol>

                <p>
                    Ready to get started?{' '}
                    <Link href="/docs/getting-started" className="text-blue-500 hover:underline">
                        Follow our getting started guide →
                    </Link>
                </p>
            </section>
        </motion.div>
    );
}
