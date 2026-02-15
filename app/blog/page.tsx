'use client';

import { motion } from 'framer-motion';
import { Bell, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
    title: string;
    description: string;
    date: string;
    readTime: string;
    link: string;
    tags: string[];
}

const blogs: BlogPost[] = [
    {
        title: 'Implement Push Notifications in React Native with Firebase FCM (HTTP v1)',
        description: 'A comprehensive guide to setting up push notifications using the new Firebase HTTP v1 API and Node.js backend.',
        date: 'Feb 15, 2026',
        readTime: '8 min read',
        link: 'https://medium.com/@prajapatimukesh0111/implement-push-notifications-in-react-native-with-firebase-fcm-http-v1-and-node-js-6d76922f5585',
        tags: ['React Native', 'Firebase', 'Node.js']
    }
];

export default function BlogPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

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

                {/* Blog Grid */}
                <div className="grid gap-6 mb-20">
                    {blogs.map((blog, index) => (
                        <motion.a
                            key={index}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group block p-6 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                        <span>{blog.date}</span>
                                        <span>•</span>
                                        <span>{blog.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {blog.description}
                                    </p>
                                    <div className="flex gap-2">
                                        {blog.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0 self-center">
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 p-8 rounded-2xl border border-border bg-gradient-to-br from-blue-600/5 to-purple-600/5 max-w-2xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-500/10 text-blue-500 mb-4">
                            <Bell className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Get Notified</h3>
                        <p className="text-muted-foreground">
                            Subscribe to get the latest components and tutorials directly in your inbox.
                        </p>
                    </div>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 rounded-xl bg-green-500/10 text-green-500 text-center font-medium border border-green-500/20"
                        >
                            🎉 Thanks for subscribing! We'll be in touch.
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Subscribe
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
