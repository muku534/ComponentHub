'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, ExternalLink } from 'lucide-react';
import { components } from '@/lib/constants';

const categories = ['All', 'Form', 'Layout', 'Display', 'Overlay', 'Feedback', 'Navigation'];

export default function ComponentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredComponents = components.filter(component => {
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Browse{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Components
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Production-ready React Native components. Copy, paste, and customize.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    {/* Category Tabs and View Toggle */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                            : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''
                                    }`}
                                aria-label="Grid view"
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-background shadow-sm' : ''
                                    }`}
                                aria-label="List view"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Components Grid/List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-4'
                    }
                >
                    {filteredComponents.map((component, index) => (
                        <motion.div
                            key={component.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`group relative rounded-2xl border border-border bg-background overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 ${viewMode === 'list' ? 'flex items-center' : ''
                                }`}
                        >
                            {/* Preview Area */}
                            <div className={`bg-muted/50 flex items-center justify-center ${viewMode === 'grid' ? 'h-40' : 'w-32 h-24'
                                }`}>
                                <div className="text-4xl font-bold text-muted-foreground/30">
                                    {component.name[0]}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-lg">{component.name}</h3>
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                                            {component.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{component.description}</p>
                                </div>

                                {viewMode === 'list' && (
                                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Hover overlay for grid */}
                            {viewMode === 'grid' && (
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredComponents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No components found matching your criteria.</p>
                    </div>
                )}

                {/* Coming Soon Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 rounded-2xl border border-border bg-muted/30 text-center"
                >
                    <h3 className="text-xl font-semibold mb-2">More Components Coming Soon</h3>
                    <p className="text-muted-foreground">
                        We&apos;re constantly adding new components. Stay tuned for updates!
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
