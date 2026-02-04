// Dynamic Component Registry Utilities
// Provides functions for loading components from the file-based registry

import { promises as fs } from 'fs';
import path from 'path';
import type { Registry, ComponentMetadata, ComponentData, RegistryEntry } from './types';

// Get the registry directory path
const getRegistryPath = () => {
    return path.join(process.cwd(), 'registry');
};

// Load the master registry index
async function loadRegistry(): Promise<Registry> {
    const registryPath = path.join(getRegistryPath(), 'registry.json');
    const content = await fs.readFile(registryPath, 'utf-8');
    return JSON.parse(content);
}

// Load component metadata from its folder
async function loadComponentMetadata(componentPath: string): Promise<ComponentMetadata> {
    const metadataPath = path.join(getRegistryPath(), componentPath, 'metadata.json');
    const content = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(content);
}

// Load component source code


/**
 * Get all components with their full metadata (for component listing page)
 * This loads metadata but NOT the full source code for performance
 */
export async function getAllComponents(): Promise<ComponentMetadata[]> {
    const registry = await loadRegistry();

    const components = await Promise.all(
        registry.components.map(async (entry: RegistryEntry) => {
            const metadata = await loadComponentMetadata(entry.path);
            return metadata;
        })
    );

    return components;
}

/**
 * Get a single component by ID with full source code
 * Used on component detail pages
 */
export async function getComponentById(id: string): Promise<ComponentData | null> {
    const registry = await loadRegistry();
    const entry = registry.components.find((c: RegistryEntry) => c.id === id);

    if (!entry) {
        return null;
    }

    const metadata = await loadComponentMetadata(entry.path);
    const fullCode = await loadComponentCode(entry.path, metadata.files);

    return {
        ...metadata,
        fullCode,
        nativeFiles: fullCode.nativeFiles
    };
}

// Load component source code
async function loadComponentCode(componentPath: string, extraFiles?: string[]): Promise<{ typescript: string; javascript: string; nativeFiles?: Record<string, string> }> {
    const basePath = path.join(getRegistryPath(), componentPath);

    // Find the component files (they follow naming convention)
    const files = await fs.readdir(basePath);
    const tsxFile = files.find(f => f.endsWith('.tsx'));
    const jsxFile = files.find(f => f.endsWith('.jsx'));

    let typescript = '// TypeScript source not available';
    let javascript = '// JavaScript source not available';
    const nativeFiles: Record<string, string> = {};

    if (tsxFile) {
        typescript = await fs.readFile(path.join(basePath, tsxFile), 'utf-8');
    }

    if (jsxFile) {
        javascript = await fs.readFile(path.join(basePath, jsxFile), 'utf-8');
    }

    // Load extra native files if specified
    if (extraFiles && extraFiles.length > 0) {
        for (const file of extraFiles) {
            try {
                const content = await fs.readFile(path.join(basePath, file), 'utf-8');
                nativeFiles[file] = content;
            } catch (e) {
                console.warn(`Failed to read file ${file} for component ${componentPath}`);
            }
        }
    }

    return { typescript, javascript, nativeFiles };
}

/**
 * Get components filtered by category
 */
export async function getComponentsByCategory(category: string): Promise<ComponentMetadata[]> {
    const allComponents = await getAllComponents();

    if (category === 'All') {
        return allComponents;
    }

    return allComponents.filter(c => c.category === category);
}

/**
 * Search components by query (searches name and description)
 */
export async function searchComponents(query: string): Promise<ComponentMetadata[]> {
    const allComponents = await getAllComponents();
    const lowerQuery = query.toLowerCase();

    return allComponents.filter(c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get related components (same category, excluding current)
 */
export async function getRelatedComponents(id: string, limit: number = 3): Promise<ComponentMetadata[]> {
    const component = await getComponentById(id);

    if (!component) {
        return [];
    }

    const allComponents = await getAllComponents();
    return allComponents
        .filter(c => c.category === component.category && c.id !== id)
        .slice(0, limit);
}

/**
 * Get all available categories
 */
export async function getCategories(): Promise<string[]> {
    const allComponents = await getAllComponents();
    const categories = new Set(allComponents.map(c => c.category));
    return ['All', ...Array.from(categories)];
}
