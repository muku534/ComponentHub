'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { logEvent } from '@/lib/firebase';

export default function DependencyCard({ title, description, command }: { title: string, description: string, command: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        logEvent('copy_installation_command', {
            command_title: title,
            command: command
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group p-5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
                <h4 className="font-bold mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="relative bg-gray-950 rounded-lg border border-gray-800 flex items-center min-w-[280px]">
                <code className="flex-1 block text-gray-300 text-xs font-mono p-3 truncate pr-10">
                    {command}
                </code>
                <button
                    onClick={handleCopy}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                    title="Copy command"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
}
