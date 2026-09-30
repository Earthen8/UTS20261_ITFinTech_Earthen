import type { ReactNode } from 'react';

/**
 * Mobile-first page container:
 * - On mobile (< sm): Full bleed edge-to-edge with warm off-white background.
 * - On desktop (>= sm): Centered mobile card with subtle shadow on earthy backdrop.
 */
export default function MobileFrame({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen justify-center bg-[#faf8f5] sm:bg-[#f0ebe4] sm:px-4 sm:py-8">
            <main className="relative flex min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-[#faf8f5] sm:min-h-[auto] sm:rounded-3xl sm:border sm:border-[#e4ddd3] sm:shadow-2xl sm:bg-white">
                {children}
            </main>
        </div>
    );
}