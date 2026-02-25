import { MotionDiv } from '@/components/ui/ClientMotion';
import { Shield, Lock, Eye, FileText, Server, Globe, Cookie, Bell } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    const sections = [
        {
            title: '1. Information We Collect',
            content: (
                <>
                    <p className="mb-4">
                        A key principle of nativecn-ui is privacy by design. As a library of copy-paste components, we minimize data collection:
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-foreground shrink-0" />
                            <span className="leading-relaxed"><strong className="text-foreground font-medium">Personal Information:</strong> We do not collect names, emails, addresses, or phone numbers unless you explicitly provide them via our contact channels.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-foreground shrink-0" />
                            <span className="leading-relaxed"><strong className="text-foreground font-medium">Usage Data:</strong> We may collect anonymous usage data (e.g., page views, browser type) to improve the performance of our documentation site.</span>
                        </li>
                    </ul>
                </>
            )
        },
        {
            title: '2. How We Use Your Information',
            content: (
                <>
                    <p className="mb-4">
                        Any data we do collect is used strictly for legitimate business purposes:
                    </p>
                    <ul className="space-y-2">
                        {[
                            'To provide, operate, and maintain our website',
                            'To improve, personalize, and expand our website',
                            'To understand and analyze how you use our website',
                            'To develop new products, services, features, and functionality',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground p-3 rounded-xl bg-muted/40 border border-border/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            title: '3. Data Storage & Ownership',
            content: (
                <>
                    <p className="mb-4 leading-relaxed">
                        Our "Copy & Paste" architecture ensures you retain full control over your code:
                    </p>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-muted-foreground" /> Zero Dependency Tracking
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Once you copy a component, it lives in <strong>your</strong> codebase. We have no access to it, no remote tracking scripts, and no way to disable or modify it remotely.
                        </p>
                    </div>
                </>
            )
        },
        {
            title: '4. Cookies and Web Beacons',
            content: (
                <p className="leading-relaxed">
                    Like any other website, nativecn-ui uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
            )
        },
        {
            title: '5. Third Party Privacy Policies',
            content: (
                <p className="leading-relaxed">
                    nativecn-ui's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>
            )
        },
        {
            title: '6. GDPR Data Protection Rights',
            content: (
                <>
                    <p className="mb-4 leading-relaxed">
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'The right to access',
                            'The right to rectification',
                            'The right to erasure',
                            'The right to restrict processing',
                            'The right to object to processing',
                            'The right to data portability'
                        ].map((right, i) => (
                            <span key={i} className="px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border/50 rounded bg-muted/30">
                                {right}
                            </span>
                        ))}
                    </div>
                </>
            )
        },
        {
            title: '7. Children\'s Information',
            content: (
                <p className="leading-relaxed">
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. nativecn-ui does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                </p>
            )
        },
        {
            title: '8. Changes to This Terms',
            content: (
                <p className="leading-relaxed">
                    We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background relative">
            <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />

            <div className="max-w-3xl mx-auto relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-16 pt-12">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground font-light mb-6">
                            Transparency is our core value. We believe in software that respects your privacy by default.
                        </p>
                        <div className="inline-flex items-center px-3 py-1 rounded-md bg-muted border border-border/50 text-xs text-muted-foreground font-medium">
                            Last updated: February 15, 2026
                        </div>
                    </div>

                    <div className="space-y-10 mb-16">
                        {sections.map((section, index) => (
                            <section key={section.title} className="scroll-m-20">
                                <h2 className="text-xl font-semibold tracking-tight mb-4">{section.title}</h2>
                                <div className="text-muted-foreground text-sm leading-relaxed">
                                    {section.content}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="p-8 rounded-[24px] bg-card border border-border/40 shadow-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Questions about your privacy?</h3>
                        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                            We're happy to answer any inquiries you might have regarding how we handle your data.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-foreground text-background font-medium rounded-full text-sm hover:opacity-90 transition-opacity"
                        >
                            Contact Support
                        </Link>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
