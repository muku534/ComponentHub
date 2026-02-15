'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Server, Globe, Cookie, Bell } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/constants';

export default function PrivacyPage() {
    const sections = [
        {
            icon: Eye,
            title: '1. Information We Collect',
            content: (
                <>
                    <p className="mb-4">
                        A key principle of nativecn-ui is privacy by design. As a library of copy-paste components, we minimize data collection:
                    </p>
                    <ul className="space-y-2 ml-1">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 shrink-0" />
                            <span><strong>Personal Information:</strong> We do not collect names, emails, addresses, or phone numbers unless you explicitly provide them via our contact channels.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 shrink-0" />
                            <span><strong>Usage Data:</strong> We may collect anonymous usage data (e.g., page views, browser type) to improve the performance of our documentation site.</span>
                        </li>
                    </ul>
                </>
            )
        },
        {
            icon: Lock,
            title: '2. How We Use Your Information',
            content: (
                <>
                    <p className="mb-4">
                        Any data we do collect is used strictly for legitimate business purposes:
                    </p>
                    <ul className="space-y-2 ml-1">
                        {[
                            'To provide, operate, and maintain our website',
                            'To improve, personalize, and expand our website',
                            'To understand and analyze how you use our website',
                            'To develop new products, services, features, and functionality',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg border border-border/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            icon: Server,
            title: '3. Data Storage & Ownership',
            content: (
                <>
                    <p className="mb-4">
                        Our "Copy & Paste" architecture ensures you retain full control over your code:
                    </p>
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-2">
                        <h4 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Zero Dependency
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Once you copy a component, it lives in **your** codebase. We have no access to it, no remote tracking scripts, and no way to disable or modify it remotely.
                        </p>
                    </div>
                </>
            )
        },
        {
            icon: Cookie,
            title: '4. Cookies and Web Beacons',
            content: (
                <p>
                    Like any other website, nativecn-ui uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
            )
        },
        {
            icon: Globe,
            title: '5. Third Party Privacy Policies',
            content: (
                <p>
                    nativecn-ui's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>
            )
        },
        {
            icon: Bell,
            title: '6. GDPR Data Protection Rights',
            content: (
                <>
                    <p className="mb-4">
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                            'The right to access',
                            'The right to rectification',
                            'The right to erasure',
                            'The right to restrict processing',
                            'The right to object to processing',
                            'The right to data portability'
                        ].map((right, i) => (
                            <li key={i} className="text-xs text-muted-foreground border border-border/50 px-2 py-1.5 rounded bg-background/50">
                                {right}
                            </li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            icon: FileText,
            title: '7. Children\'s Information',
            content: (
                <p>
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. nativecn-ui does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                </p>
            )
        },
        {
            icon: Shield,
            title: '8. Changes to This Terms',
            content: (
                <p>
                    We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
                </p>
            )
        }
    ];

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-500 mb-6 ring-1 ring-blue-500/20">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Transparency is our core value. We believe in software that respects your privacy by default.
                        </p>
                        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border text-xs text-muted-foreground">
                            Last updated: February 15, 2026
                        </div>
                    </div>

                    {/* Content Cards */}
                    <div className="grid gap-6 mb-12">
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group p-6 md:p-8 rounded-2xl border border-border bg-gradient-to-br from-muted/20 to-muted/5 hover:bg-muted/30 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 p-2.5 rounded-xl bg-background border border-border shadow-sm group-hover:border-blue-500/30 group-hover:shadow-blue-500/10 transition-all duration-300">
                                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                                            <div className="text-muted-foreground leading-relaxed">
                                                {section.content}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent border border-border/50"
                    >
                        <h3 className="text-lg font-semibold mb-2">Have questions about our privacy practices?</h3>
                        <p className="text-muted-foreground mb-6">
                            We're happy to answer any questions you might have.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Support
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
