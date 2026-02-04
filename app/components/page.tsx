import { getAllComponents } from '@/lib/registry';
import ComponentsPageClient from './ComponentsPageClient';

export default async function ComponentsPage() {
    // Fetch components from the registry at build/request time
    const components = await getAllComponents();

    return <ComponentsPageClient initialComponents={components} />;
}
