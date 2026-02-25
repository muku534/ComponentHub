import Link from 'next/link';
import { MotionDiv } from '@/components/ui/ClientMotion';
import { Mail, Github, Twitter, MessageSquare, ArrowRight, ExternalLink, Linkedin, FileText } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background relative">
            <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-16 pt-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                            We're here to help. Whether you have a question about a component, found a bug, or just want to connect.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* LinkedIn Card */}
                        <div className="rounded-[24px] bg-card border border-border/40 hover:border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 p-8 flex flex-col h-full group">
                            <div className="w-12 h-12 rounded-[14px] bg-muted/50 flex items-center justify-center mb-6 border border-border/40 shadow-sm">
                                <Linkedin className="w-5 h-5 text-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Connect on LinkedIn</h3>
                            <p className="text-muted-foreground mb-8 text-sm leading-relaxed flex-grow">
                                Let's connect professionally. I'm always open to discussing React Native, new opportunities, or tech in general.
                            </p>
                            <a
                                href={siteConfig.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity w-fit"
                            >
                                View Profile
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Twitter Card */}
                        <div className="rounded-[24px] bg-card border border-border/40 hover:border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 p-8 flex flex-col h-full group">
                            <div className="w-12 h-12 rounded-[14px] bg-muted/50 flex items-center justify-center mb-6 border border-border/40 shadow-sm">
                                <Twitter className="w-5 h-5 text-foreground" />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold">Twitter / X</h3>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted border border-border/50 text-muted-foreground">
                                    DMs open
                                </span>
                            </div>
                            <p className="text-muted-foreground mb-8 text-sm leading-relaxed flex-grow">
                                Follow us for updates and quick questions. Direct messages are open and we generally respond within 24 hours.
                            </p>
                            <a
                                href={siteConfig.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-foreground hover:text-muted-foreground flex items-center gap-1 transition-colors"
                            >
                                Follow @MukeshPraj81318 <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="rounded-[32px] bg-card border border-border/40 p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                        <div className="relative z-10 max-w-sm">
                            <h3 className="text-2xl font-bold mb-3">Send us a message</h3>
                            <p className="text-muted-foreground mb-8 text-sm">
                                Prefer email? You can reach out to us directly for general inquiries, partnerships, or just to say hello.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email Support</h4>
                                    <a href="mailto:prajapatimukesh0111@gmail.com" className="text-foreground hover:underline font-medium">
                                        prajapatimukesh0111@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Project Maintainer</h4>
                                    <p className="text-foreground font-medium">Mukesh Prajapati</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 p-6 rounded-[24px] bg-muted/30 border border-border/50 shrink-0 w-full md:w-auto mt-auto">
                            <p className="text-sm text-foreground mb-3 font-medium">Looking for documentation?</p>
                            <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border/50 rounded-xl text-sm font-medium hover:bg-muted transition-colors shadow-sm">
                                <FileText className="w-4 h-4" /> Visit Docs
                            </Link>
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}
