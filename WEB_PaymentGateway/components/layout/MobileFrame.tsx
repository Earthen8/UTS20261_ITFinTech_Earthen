import type { ReactNode } from 'react';

/**
 * Mobile-first page container:
 * - On mobile (< sm): Full bleed edge-to-edge, zero margin/padding, no outer borders.
 * - On desktop (>= sm): Centered mobile card with subtle rounded corners and shadow.
 */
export default function MobileFrame({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen justify-center bg-white sm:bg-[#f5f5f7] sm:px-4 sm:py-8">
            <main className="relative flex min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-white sm:min-h-[auto] sm:rounded-2xl sm:border sm:border-gray-100 sm:shadow-xl">
                {children}
            </main>
        </div>
    );
}