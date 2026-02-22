'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeCopyButtonProps {
    code: string;
}

export default function CodeCopyButton({ code }: CodeCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
    );
}
