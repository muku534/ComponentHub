
import Sidebar from '@/components/docs/Sidebar';
import DocsMobileNav from '@/components/docs/DocsMobileNav';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="pt-16 min-h-screen">
            <div className="max-w-7xl mx-auto flex">
                {/* Mobile Navigation (Client Component) */}
                <DocsMobileNav />

                {/* Sidebar - Desktop */}
                <aside className="hidden md:block w-64 shrink-0 border-r border-border">
                    <div className="sticky top-20 p-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                        <Sidebar />
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
                    <div className="max-w-3xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
