import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/analytics/',
            ],
        },
        sitemap: 'https://nativecn-ui.vercel.app/sitemap.xml',
    };
}