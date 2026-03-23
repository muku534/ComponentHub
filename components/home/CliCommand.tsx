'use client';

import { Terminal, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CliCommandProps {
    command?: string;
    compact?: boolean;
}

export function CliCommand({
    command = 'npx nativecn add animated-tab-bar',
    compact = false
}: CliCommandProps) {
    // Commented out for now as npm package is not available
    return null;

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex flex-col items-center gap-3 ${compact ? 'w-full' : 'w-fit mx-auto'}`}>
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`group cursor-pointer relative overflow-hidden transition-all
                    ${compact ? 'w-full' : 'w-fit'}
                `}
                onClick={handleCopy}
            >
                <div className={`relative flex items-center gap-2 sm:gap-3 rounded-full 
                    bg-zinc-950/5 dark:bg-zinc-950/40 
                    border border-zinc-200/50 dark:border-white/5 
                    backdrop-blur-md group-hover:border-zinc-300 dark:group-hover:border-white/10 
                    transition-all shadow-sm
                    ${compact ? 'px-3 sm:px-4 py-1.5 sm:py-2' : 'px-4 sm:px-5 py-2 sm:py-2.5'}
                `}>
                    <Terminal className={`${compact ? 'w-3 h-3' : 'w-3 h-3 sm:w-3.5 sm:h-3.5'} text-muted-foreground group-hover:text-foreground transition-colors shrink-0`} />
                    <code className={`${compact ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-sm'} font-mono text-foreground flex items-center pr-20 sm:pr-28 whitespace-nowrap overflow-hidden`}>
                        <span className="text-zinc-500 mr-1.5 sm:mr-2 shrink-0">$</span>
                        <span className="truncate">
                            {command.split(' ').map((word, i) => (
                                <span key={i} className={word === 'animated-tab-bar' || word === command.split(' ').pop() ? 'text-blue-500 ml-1.5' : 'ml-1.5 first:ml-0'}>
                                    {word}
                                </span>
                            ))}
                        </span>
                    </code>

                    <div className="absolute right-3 flex items-center">
                        <div className={`transition-all duration-300 flex items-center gap-1.5 absolute right-0 bg-background/95 dark:bg-zinc-900/95 backdrop-blur-md px-2 py-1 rounded-md border border-border shadow-sm ${copied ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} uppercase tracking-widest text-emerald-500 font-bold`}>Copied</span>
                        </div>
                        <div className={`transition-all duration-300 absolute right-0 bg-background/95 dark:bg-zinc-900/95 backdrop-blur-md px-2 py-1 rounded-md border border-border shadow-sm hidden sm:flex ${!copied ? 'opacity-0 group-hover:opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
                            <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} uppercase tracking-widest text-muted-foreground font-bold whitespace-nowrap`}>
                                Click to copy
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Clarifier Line */}
            <p className={`${compact ? 'text-[10px]' : 'text-xs'} font-mono text-muted-foreground/60 text-center`}>
                // The CLI copies the source file into your project. <br className="sm:hidden" />
                // No package is installed. You own the code.
            </p>
        </div>
    );
}
