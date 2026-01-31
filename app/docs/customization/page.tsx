'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Copy, Palette, Type, Layers } from 'lucide-react';

export default function CustomizationPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Customization</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to customize ComponentHub components to match your design system.
                </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>Design Philosophy</h2>
                <p>
                    ComponentHub components are designed to be easily customizable. We use a
                    consistent approach to styling that makes it simple to adapt components
                    to your brand.
                </p>

                <div className="not-prose my-8 grid gap-4 sm:grid-cols-3">
                    {[
                        { icon: Palette, title: 'Colors', desc: 'Easily swap color palettes' },
                        { icon: Type, title: 'Typography', desc: 'Use your own fonts' },
                        { icon: Layers, title: 'Spacing', desc: 'Adjust padding and margins' },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="p-4 rounded-xl border border-border bg-muted/30 text-center">
                                <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <h2>Creating a Theme</h2>
                <p>
                    We recommend creating a central theme file to manage your design tokens:
                </p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-muted/50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm text-muted-foreground">theme.ts</span>
                            <button className="p-1.5 rounded-md hover:bg-background transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                            <code>{`export const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    border: '#334155',
    success: '#22C55E',
    error: '#EF4444',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
};`}</code>
                        </pre>
                    </div>
                </div>

                <h2>Using the Theme</h2>
                <p>
                    Reference your theme in component styles:
                </p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-muted/50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm text-muted-foreground">Button.tsx</span>
                            <button className="p-1.5 rounded-md hover:bg-background transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                            <code>{`import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: '600',
  },
});`}</code>
                        </pre>
                    </div>
                </div>

                <h2>Dark Mode Support</h2>
                <p>
                    Implement dark mode by using React Native&apos;s <code>useColorScheme</code> hook:
                </p>

                <div className="not-prose my-6">
                    <div className="relative rounded-xl border border-border bg-muted/50 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted">
                            <span className="text-sm text-muted-foreground">useTheme.ts</span>
                            <button className="p-1.5 rounded-md hover:bg-background transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                            <code>{`import { useColorScheme } from 'react-native';

const lightColors = {
  background: '#FFFFFF',
  text: '#0F172A',
  // ...
};

const darkColors = {
  background: '#0F172A',
  text: '#F8FAFC',
  // ...
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  
  return { colors, isDark: colorScheme === 'dark' };
};`}</code>
                        </pre>
                    </div>
                </div>

                <h2>Customization Tips</h2>
                <ul>
                    <li><strong>Start simple</strong> – Only customize what you need</li>
                    <li><strong>Be consistent</strong> – Use the same spacing and colors everywhere</li>
                    <li><strong>Test on devices</strong> – Colors can look different on various screens</li>
                    <li><strong>Consider accessibility</strong> – Ensure sufficient color contrast</li>
                </ul>

                <h2>Need Help?</h2>
                <p>
                    If you need help customizing components, check out our{' '}
                    <Link href="/components" className="text-blue-500 hover:underline">
                        component examples
                    </Link>{' '}
                    or reach out on our community channels.
                </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                <Link
                    href="/docs/installation"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Installation
                </Link>
                <Link
                    href="/components"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                >
                    Browse Components
                </Link>
            </div>
        </motion.div>
    );
}
