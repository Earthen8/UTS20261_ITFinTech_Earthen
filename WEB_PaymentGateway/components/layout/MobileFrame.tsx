import type { ReactNode } from 'react';

/** Page background + centered "phone" card shared by all three pages. */
export default function MobileFrame({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4" >
            <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden" >
                {children}
            </div>
        </main>
    );
}