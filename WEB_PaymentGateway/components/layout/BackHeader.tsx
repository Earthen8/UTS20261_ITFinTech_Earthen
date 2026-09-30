import Link from 'next/link';
import { ChevronLeftIcon } from '../ui/Icons';

interface BackHeaderProps {
    title: string;
    backHref: string;
}

/** Sticky "< Back   Title" header bar with earthy styling. */
export default function BackHeader({ title, backHref }: BackHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#e4ddd3] bg-[#faf8f5]/95 px-5 py-3.5 backdrop-blur-md sm:bg-white/95">
            <Link
                href={backHref}
                aria-label="Back"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0ebe4] text-[#5c4f3a] transition hover:bg-[#e4ddd3] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-bold tracking-tight text-[#2e261c]">{title}</h1>
        </header>
    );
}