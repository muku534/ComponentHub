import { notFound } from 'next/navigation';
import { getComponentById, getRelatedComponents } from '@/lib/registry';
import ComponentDetailClient from './ComponentDetailClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ComponentDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch component data from registry
    const component = await getComponentById(id);

    if (!component) {
        notFound();
    }

    // Fetch related components
    const relatedComponents = await getRelatedComponents(id, 3);

    return (
        <ComponentDetailClient
            component={component}
            relatedComponents={relatedComponents}
        />
    );
}

// Generate static params for all components
export async function generateStaticParams() {
    const { getAllComponents } = await import('@/lib/registry');
    const components = await getAllComponents();

    return components.map((component) => ({
        id: component.id,
    }));
}
