import { getAllComponents } from '@/lib/registry';
import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation to ensure Google indexes every component page.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = 'https://nativecn-ui.vercel.app';
    const components = await getAllComponents();

    // Map all individual components into the sitemap
    const componentUrls = components.map((component) => ({
        url: `${siteUrl}/components/${component.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static core pages
    const mainUrls = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${siteUrl}/studio`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${siteUrl}/components`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${siteUrl}/docs`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
    ];

    return [...mainUrls, ...componentUrls];
}
