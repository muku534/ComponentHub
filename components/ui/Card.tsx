import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-border bg-background p-6 transition-all duration-300',
                hover && 'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardHeader({ className, ...props }: CardHeaderProps) {
    return <div className={cn('mb-4', className)} {...props} />;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export function CardTitle({ className, ...props }: CardTitleProps) {
    return <h3 className={cn('text-xl font-semibold', className)} {...props} />;
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export function CardDescription({ className, ...props }: CardDescriptionProps) {
    return <p className={cn('text-muted-foreground', className)} {...props} />;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardContent({ className, ...props }: CardContentProps) {
    return <div className={cn('', className)} {...props} />;
}
