
import { MotionDiv, MotionA } from '@/components/ui/ClientMotion';
import Link from 'next/link';
import { ArrowLeft, Palette, Type, Layers } from 'lucide-react';
import CodeCopyButton from '@/components/docs/CodeCopyButton';

export default function CustomizationPage() {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Customization</h1>
                <p className="text-lg text-muted-foreground">
                    Learn how to customize nativecn-ui components to match your design system.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6">Design Philosophy</h2>
                    <div className="p-6 rounded-xl border border-border bg-muted/20">
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            nativecn-ui components are designed to be easily customizable. We use a
                            consistent approach to styling that makes it simple to adapt components
                            to your brand while maintaining a premium feel.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                { icon: Palette, title: 'Colors', desc: 'Easily swap hex codes to match your brand palette' },
                                { icon: Type, title: 'Typography', desc: 'Use your own font families and weight scales' },
                                { icon: Layers, title: 'Spacing', desc: 'Consistent padding and margin variables' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="p-5 rounded-xl bg-background border border-border/50 text-center hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold mb-1">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Creating a Theme</h2>
                    <p className="text-muted-foreground mb-6">
                        We recommend creating a central theme file to manage your design tokens. This keeps your design system consistent.
                    </p>

                    <div className="relative rounded-xl border border-border bg-gray-950 overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono ml-2">theme.ts</span>
                            </div>
                            <CodeCopyButton code="export const theme = {
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
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },
  borderRadius: {
    sm: 4, md: 8, lg: 12, xl: 16, full: 9999,
  },
  fontSize: {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24,
  },
};" />
                        </div>
                        <pre className="p-6 text-sm text-blue-100 overflow-x-auto font-mono leading-relaxed">
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
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },
  borderRadius: {
    sm: 4, md: 8, lg: 12, xl: 16, full: 9999,
  },
  fontSize: {
    xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24,
  },
};`}</code>
                        </pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Using the Theme</h2>
                    <p className="text-muted-foreground mb-6">
                        Reference your theme in component styles for immediate consistency across your app.
                    </p>

                    <div className="relative rounded-xl border border-border bg-gray-950 overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                                <span className="text-xs text-gray-400 font-mono ml-2">components/ui/Button.tsx</span>
                            </div>
                            <CodeCopyButton code="import { StyleSheet } from 'react-native';
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
});" />
                        </div>
                        <pre className="p-6 text-sm text-blue-100 overflow-x-auto font-mono leading-relaxed">
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
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6">Customization Tips</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">Best Practices</h3>
                            <ul className="space-y-3">
                                {[
                                    'Start simple – Only customize what you need first',
                                    'Be consistent – Use theme tokens everywhere',
                                    'Test on devices – Validation on real screens is key',
                                    'Consider accessibility – Check color contrast ratios'
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 flex flex-col justify-center text-center">
                            <h3 className="font-bold text-lg mb-2">Need More Help?</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                If you need help customizing components, check out our examples or join the community.
                            </p>
                            <Link href="/components" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium">
                                View Component Examples
                            </Link>
                        </div>
                    </div>
                </section>
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
        </MotionDiv>
    );
}
