import type { ReactNode } from 'react';

/** Page background + centered "phone" card shared by all three pages. */
export default function MobileFrame({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-[#f0f0f5] flex justify-center py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
                {children}
            </div>
        </main>
    );
}