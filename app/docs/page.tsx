import { getAllComponents } from '@/lib/registry';
import DocsPageClient from './DocsPageClient';

export default async function DocsPage() {
    const components = await getAllComponents();

    return <DocsPageClient components={components} />;
}
