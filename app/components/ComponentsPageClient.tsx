'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, ExternalLink, ArrowRight, Compass, Sliders, MousePointer2, Layers, Loader2, LayoutGrid, Terminal } from 'lucide-react';
import type { ComponentMetadata } from '@/lib/types';
import { trackCopyCode, trackCategoryFilter, trackSearch, trackCardClick } from '@/lib/analytics';

// Category data with icons
const categories = [
    { name: 'All', icon: LayoutGrid },
    { name: 'Navigation', icon: Compass },
    { name: 'Input', icon: Sliders },
    { name: 'Button', icon: MousePointer2 },
    { name: 'Modal', icon: Layers },
    { name: 'Loading', icon: Loader2 },
];

interface ComponentsPageClientProps {
    initialComponents: ComponentMetadata[];
}

export default function ComponentsPageClient({ initialComponents }: ComponentsPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [trendingIds, setTrendingIds] = useState<string[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Update sliding indicator position
    useEffect(() => {
        const activeIndex = categories.findIndex(c => c.name === selectedCategory);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [selectedCategory]);

    // Fetch Trending Components
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await fetch('/api/analytics/track?type=trending');
                if (res.ok) {
                    const data = await res.json();
                    setTrendingIds(data.trending || []);
                }
            } catch (e) {
                console.error('Failed to fetch trending components:', e);
            }
        };
        fetchTrending();
    }, []);

    const filteredComponents = initialComponents.filter(component => {
        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Debounced search tracking
    const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        if (value.trim().length >= 2) {
            searchTimerRef.current = setTimeout(() => {
                const results = initialComponents.filter(c =>
                    c.name.toLowerCase().includes(value.toLowerCase()) ||
                    c.description.toLowerCase().includes(value.toLowerCase())
                );
                trackSearch(value, results.length);
            }, 800);
        }
    }, [initialComponents]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category !== 'All') {
            trackCategoryFilter(category);
        }
    };

    const handleCopyCli = async (component: any) => {
        try {
            const command = `npx nativecn add ${component.slug || component.id}`;
            await navigator.clipboard.writeText(command);
            setCopiedId(component.id);
            trackCopyCode(component.id, component.name, 'cli_grid');
            setTimeout(() => setCopiedId(null), 2000);
        } catch (error) {
            console.error('Failed to copy CLI command:', error);
            // Fallback: still show feedback so user knows something happened
            setCopiedId(component.id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const handleCardClick = (component: ComponentMetadata, index: number) => {
        trackCardClick(component.id, component.name, index);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background relative">
            <div className="absolute inset-0 z-0 bg-dot-pattern opacity-[0.4] dark:opacity-[0.2]" />
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border mb-8 backdrop-blur-md shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></span>
                        <span className="text-sm font-medium text-muted-foreground">{initialComponents.length} Components Available</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground drop-shadow-sm">
                        Component Library
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        Premium React Native components. Copy, paste, and ship faster.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-14 flex flex-col lg:flex-row gap-6 items-center justify-between sticky top-20 z-40 bg-background/80 backdrop-blur-xl p-4 rounded-2xl border border-border/50 shadow-sm"
                >
                    {/* Category Filter */}
                    <div className="flex w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                        <div className="relative inline-flex p-1 bg-muted/40 rounded-xl border border-border/50">
                            {/* Sliding Background Indicator */}
                            <motion.div
                                className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm border border-border"
                                initial={false}
                                animate={{
                                    left: indicatorStyle.left,
                                    width: indicatorStyle.width,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />

                            {/* Filter Buttons */}
                            {categories.map((cat, index) => {
                                const Icon = cat.icon;
                                const isActive = selectedCategory === cat.name;
                                return (
                                    <button
                                        key={cat.name}
                                        ref={el => { buttonRefs.current[index] = el; }}
                                        onClick={() => handleCategoryChange(cat.name)}
                                        className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 ${isActive
                                            ? 'text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-[350px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </motion.div>



                {/* Component Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredComponents.map((component, index) => (
                            <motion.div
                                key={component.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                layout
                                className="group relative"
                            >
                                {/* Card with solid styling */}
                                <div className="h-full rounded-[24px] bg-card border border-border/40 hover:border-border/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden transform group-hover:-translate-y-1">
                                    {/* Content Container with fixed structure */}
                                    <div className="relative p-7 flex flex-col h-full cursor-pointer group/card" onClick={() => handleCardClick(component, index)}>
                                        {/* Trending Badge Overlay */}
                                        {trendingIds.includes(component.id) && (
                                            <div className="absolute top-3 left-3 z-30 pointer-events-none">
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 dark:bg-orange-500/20 backdrop-blur-md text-orange-600 dark:text-orange-400 rounded-full text-[9px] font-black border border-orange-500/20 shadow-sm transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-[2deg] group-hover/card:shadow-[0_4px_12px_rgba(249,115,22,0.15)]">
                                                    <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)] animate-pulse" />
                                                    <span className="tracking-wider">TRENDING</span>
                                                </div>
                                            </div>
                                        )}
                                        {/* Header Row - Fixed Height */}
                                        <div className="flex items-start justify-between gap-4 mb-5">
                                            {/* Icon */}
                                            <div className="w-14 h-14 rounded-[14px] bg-muted/50 flex items-center justify-center text-2xl border border-border/40 group-hover/card:scale-[1.15] transition-transform duration-500 ease-out shadow-sm">
                                                {component.emoji}
                                            </div>
                                            {/* Category Badge */}
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground shrink-0 border border-border/50">
                                                    {component.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title - Fixed */}
                                        <Link href={`/components/${(component as any).slug}`}>
                                            <h3 className="text-xl font-semibold mb-3 text-foreground group-hover/card:text-blue-500 transition-colors">
                                                {component.name}
                                            </h3>
                                        </Link>

                                        {/* Description - Fixed Height with line-clamp */}
                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 min-h-[40px] leading-relaxed font-light">
                                            {component.description}
                                        </p>

                                        {/* Features - Fixed Height Section */}
                                        <div className="mb-6 min-h-[72px]">
                                            <div className="flex flex-wrap gap-2">
                                                {component.features.slice(0, 2).map((feature, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 bg-muted/80 rounded-md text-xs text-muted-foreground border border-border/50"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {component.features.length > 2 && (
                                                    <span className="px-2.5 py-1 bg-transparent rounded-md text-xs text-muted-foreground border border-transparent">
                                                        +{component.features.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Spacer to push footer to bottom */}
                                        <div className="flex-grow" />

                                        {/* Footer - Always at bottom */}
                                        <div className="pt-5 border-t border-border mt-auto">
                                            {/* Dependencies Row */}
                                            <div className="flex items-center justify-between mb-5">
                                                {component.dependencies.required.length === 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 text-muted-foreground rounded-md text-[11px] font-medium opacity-80">
                                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                        Source files only. No dependencies.
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-mono text-muted-foreground border border-border/50">
                                                        {component.dependencies.required[0]}
                                                    </span>
                                                )}
                                                <span className="text-xs text-muted-foreground font-mono">
                                                    v{component.version}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => handleCopyCli(component)}
                                                    className="flex-1 px-4 py-2.5 bg-foreground text-background hover:bg-foreground/90 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm group/btn active:scale-[0.98]"
                                                    title="Copies source directly into your project — nothing installed"
                                                >
                                                    {copiedId === component.id ? (
                                                        <><Check className="w-4 h-4 text-emerald-400" />Copied!</>
                                                    ) : (
                                                        <><Terminal className="w-4 h-4 group-hover/btn:text-blue-400 transition-colors" />Copy CLI</>
                                                    )}
                                                </button>
                                                <Link
                                                    href={`/components/${(component as any).slug}`}
                                                    className="px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors flex items-center justify-center border border-border/50 shadow-sm group/link active:scale-[0.98]"
                                                    title="View Details"
                                                >
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredComponents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 bg-card border border-border rounded-xl mt-8"
                    >
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-xl font-semibold mb-2">No components found</p>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your search or category filter.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="px-6 py-2.5 bg-background border border-border text-foreground rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-all shadow-sm"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <div className="rounded-[32px] bg-card border border-border/40 p-16 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                        <h2 className="text-4xl font-bold mb-6 tracking-tight text-foreground relative z-10">Need a specific component?</h2>
                        <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg relative z-10 font-light">
                            Can&apos;t find what you&apos;re looking for? Request it and we&apos;ll build it for the community.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_4px_14px_0_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative z-10"
                        >
                            Request a Component
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
