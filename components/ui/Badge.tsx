import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground',
                secondary: 'bg-secondary text-secondary-foreground',
                outline: 'border border-border text-foreground',
                success: 'bg-green-500/20 text-green-500 border border-green-500/30',
                warning: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30',
                error: 'bg-red-500/20 text-red-500 border border-red-500/30',
                gradient: 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-500 border border-blue-500/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}
