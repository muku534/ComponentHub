'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '@/components/docs/Sidebar';

export default function DocsMobileNav() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed bottom-6 right-6 z-50 md:hidden p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg"
                aria-label="Toggle sidebar"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar - Mobile */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                <div className={`absolute left-0 top-16 bottom-0 w-72 bg-background border-r border-border p-6 overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <Sidebar />
                </div>
            </div>
        </>
    );
}
