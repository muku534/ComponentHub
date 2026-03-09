'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Snack } from 'snack-sdk';

interface SnackPreviewProps {
    /** Generated App.tsx code */
    code: string;
    /** Component names to fetch source for */
    componentNames: string[];
    /** Whether the preview is currently active/visible */
    isActive: boolean;
}

/**
 * Renders a live React Native Web preview using the Snack SDK.
 * Optimized for buttery smooth 60fps touch interactions.
 */
export default function SnackPreview({ code, componentNames, isActive }: SnackPreviewProps) {
    const webPreviewRef = useRef<Window | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const snackRef = useRef<Snack | null>(null);
    const [webPreviewURL, setWebPreviewURL] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isReady, setIsReady] = useState(false);

    // Stable component name string to avoid unnecessary re-renders
    const componentKey = useMemo(() => componentNames.join(','), [componentNames]);

    // Fetch component source files + detected dependencies from our API
    const fetchComponentData = useCallback(async (names: string[]): Promise<{
        sources: Record<string, string>;
        dependencies: string[];
    }> => {
        if (names.length === 0) return { sources: {}, dependencies: [] };
        try {
            const res = await fetch('/api/studio/snack/sources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ components: names }),
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (err) {
            console.error('Failed to fetch component sources:', err);
        }
        return { sources: {}, dependencies: [] };
    }, []);

    // Initialize the Snack instance
    useEffect(() => {
        if (!isActive) {
            if (snackRef.current) {
                snackRef.current.setOnline(false);
                snackRef.current = null;
            }
            setWebPreviewURL(undefined);
            setIsLoading(true);
            setIsReady(false);
            return;
        }

        let cancelled = false;

        const initSnack = async () => {
            setIsLoading(true);
            setIsReady(false);

            const { sources, dependencies } = await fetchComponentData(componentNames);

            if (cancelled) return;

            // Build files object
            const files: Record<string, { type: 'CODE'; contents: string }> = {
                'App.tsx': { type: 'CODE', contents: code },
            };
            for (const [name, src] of Object.entries(sources)) {
                files[`${name}.tsx`] = { type: 'CODE', contents: src };
            }

            // Build dependencies object
            const deps: Record<string, { version: string }> = {};
            for (const dep of dependencies) {
                deps[dep] = { version: '*' };
            }

            // Cleanup previous
            if (snackRef.current) {
                snackRef.current.setOnline(false);
            }

            const snack = new Snack({
                files,
                dependencies: deps,
                webPreviewRef,
            });

            snackRef.current = snack;

            // Listen for state changes to get the webPreviewURL
            const unsubscribe = snack.addStateListener((state) => {
                if (cancelled) return;
                const url = state.webPreviewURL;
                if (url) {
                    setWebPreviewURL(url);
                    setIsLoading(false);
                }
            });

            snack.setOnline(true);

            // Check initial state
            const initialState = snack.getState();
            if (initialState.webPreviewURL) {
                setWebPreviewURL(initialState.webPreviewURL);
                setIsLoading(false);
            }

            return () => {
                unsubscribe();
            };
        };

        initSnack();

        return () => {
            cancelled = true;
            if (snackRef.current) {
                snackRef.current.setOnline(false);
                snackRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // Update files when code or components change while already active
    useEffect(() => {
        if (!isActive || !snackRef.current) return;

        let cancelled = false;

        const updateFiles = async () => {
            const { sources, dependencies } = await fetchComponentData(componentNames);

            if (cancelled || !snackRef.current) return;

            const files: Record<string, { type: 'CODE'; contents: string }> = {
                'App.tsx': { type: 'CODE', contents: code },
            };
            for (const [name, src] of Object.entries(sources)) {
                files[`${name}.tsx`] = { type: 'CODE', contents: src };
            }

            const deps: Record<string, { version: string }> = {};
            for (const dep of dependencies) {
                deps[dep] = { version: '*' };
            }

            snackRef.current.updateFiles(files);
            snackRef.current.updateDependencies(deps);
        };

        // Debounce updates
        const timeout = window.setTimeout(updateFiles, 600);
        return () => {
            cancelled = true;
            window.clearTimeout(timeout);
        };
    }, [code, componentKey, isActive, fetchComponentData]);

    // Handle iframe load event for smooth transition
    const handleIframeLoad = useCallback(() => {
        // Small delay to let the web player fully render before showing
        window.setTimeout(() => setIsReady(true), 500);
    }, []);

    return (
        <div
            className="w-full h-full relative overflow-hidden"
            style={{
                // GPU-accelerated container for smooth compositing
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                // Prevent any touch interference from parent
                touchAction: 'none',
            }}
        >
            {/* Loading State — fades out smoothly once iframe is ready */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e]"
                style={{
                    opacity: isReady ? 0 : 1,
                    transition: 'opacity 0.4s ease-out',
                    pointerEvents: isReady ? 'none' : 'auto',
                }}
            >
                <div className="relative">
                    <div className="w-12 h-12 border-[3px] border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 w-12 h-12 border-[3px] border-transparent border-t-indigo-400 rounded-full animate-spin" />
                </div>
                <span className="text-[10px] text-white/40 font-medium tracking-widest uppercase mt-2">
                    Starting Emulator...
                </span>
                <div className="flex gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>

            {/* The actual preview iframe — renders ONLY the running app.
                Performance optimizations applied for buttery smooth interaction. */}
            <iframe
                ref={(c) => {
                    iframeRef.current = c;
                    webPreviewRef.current = c?.contentWindow ?? null;
                }}
                src={webPreviewURL}
                onLoad={handleIframeLoad}
                allow="geolocation; camera; microphone; accelerometer; gyroscope"
                className="w-full h-full border-none"
                style={{
                    background: '#fff',
                    // Force GPU layer for the iframe — critical for smooth scrolling/swiping
                    transform: 'translate3d(0,0,0)',
                    WebkitTransform: 'translate3d(0,0,0)',
                    willChange: 'transform',
                    // Prevent browser from trying to optimize away the layer
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    // Allow touch passthrough to iframe content
                    touchAction: 'manipulation',
                    // Smooth scrolling within the iframe
                    WebkitOverflowScrolling: 'touch',
                    // Prevent any overflow clipping that might cause repaints
                    contain: 'strict',
                    // Isolate the iframe's rendering
                    isolation: 'isolate',
                }}
            />
        </div>
    );
}
