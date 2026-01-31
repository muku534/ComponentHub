'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { docsNavigation } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="space-y-6">
            {docsNavigation.map((section) => (
                <div key={section.title}>
                    <h4 className="font-semibold text-sm mb-2 px-2">{section.title}</h4>
                    <ul className="space-y-1">
                        {section.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                            isActive
                                                ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-600'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        )}
                                    >
                                        {isActive && <ChevronRight className="w-3 h-3" />}
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
