'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-blue-500 mb-6 ring-1 ring-border/50">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            We&apos;re here to help. Whether you have a question about a component, found a bug, or just want to connect.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Support Options */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="group p-8 rounded-2xl border border-border bg-gradient-to-br from-muted/20 to-muted/5 hover:bg-muted/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Github className="w-32 h-32 rotate-12" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Github className="w-6 h-6 text-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">GitHub Issues</h3>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        Found a bug or have a feature request? The fastest way to get help is to open an issue on our repository.
                                    </p>
                                    <a
                                        href={`${siteConfig.socials.github}/issues`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold bg-foreground text-background px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                                    >
                                        Open an Issue
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="group p-8 rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 hover:bg-blue-500/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                                        <Twitter className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Twitter / X</h3>
                                        <p className="text-xs text-muted-foreground">Direct Messages open</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    Follow us for updates and quick questions. We generally respond within 24 hours.
                                </p>
                                <a
                                    href={siteConfig.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1"
                                >
                                    Follow @MukeshPraj81318 <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Email / Direct Contact */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-8 rounded-2xl border border-border bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                        <Mail className="w-6 h-6" />
                                    </span>
                                    Send us a message
                                </h3>
                                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                                    Prefer email? You can reach out to us directly for general inquiries, partnerships, or just to say hello.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                                        <div className="shrink-0 p-2 rounded-lg bg-muted text-muted-foreground">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Email Support</h4>
                                            <a href="mailto:contact@nativecn-ui.dev" className="text-primary hover:underline font-medium break-all">
                                                contact@nativecn-ui.dev
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                                        <div className="shrink-0 p-2 rounded-lg bg-muted text-muted-foreground">
                                            <Github className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Project Mainteiner</h4>
                                            <p className="text-sm text-muted-foreground">Mukesh Prajapati</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-border/50">
                                <p className="text-sm text-center text-muted-foreground">
                                    Looking for documentation? <Link href="/docs" className="text-foreground underline">Visit Docs</Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
