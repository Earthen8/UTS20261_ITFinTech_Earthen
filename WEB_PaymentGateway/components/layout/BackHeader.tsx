import Link from 'next/link';
import { ChevronLeftIcon } from '../ui/Icons';

interface BackHeaderProps {
    title: string;
    backHref: string;
}

/** Sticky "< Back   Title" header bar used by Checkout, Payment, and Status pages. */
export default function BackHeader({ title, backHref }: BackHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 bg-white/95 px-5 py-3.5 backdrop-blur-md">
            <Link
                href={backHref}
                aria-label="Back"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">{title}</h1>
        </header>
    );
}