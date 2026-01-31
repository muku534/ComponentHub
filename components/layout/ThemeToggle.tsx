'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-2 w-9 h-9 rounded-lg bg-muted animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative p-2 rounded-lg hover:bg-muted transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                <Sun
                    className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                        }`}
                />
                <Moon
                    className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                            ? 'opacity-0 -rotate-90 scale-0'
                            : 'opacity-100 rotate-0 scale-100'
                        }`}
                />
            </div>
        </button>
    );
}
