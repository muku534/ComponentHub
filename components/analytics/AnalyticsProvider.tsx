'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { logEvent } from '@/lib/firebase';

function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            logEvent('page_view', {
                page_path: pathname,
                search_params: searchParams.toString(),
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export default function AnalyticsProvider() {
    return (
        <Suspense fallback={null}>
            <Analytics />
        </Suspense>
    );
}
