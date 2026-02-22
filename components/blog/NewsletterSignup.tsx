'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
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
    );
}
