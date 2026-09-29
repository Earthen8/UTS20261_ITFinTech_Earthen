import Link from 'next/link';
import { ChevronLeftIcon } from '../ui/Icons';

interface BackHeaderProps {
    title: string;
    backHref: string;
}

/** "< Back   Title" bar used by Checkout and Payment. */
export default function BackHeader({ title, backHref }: BackHeaderProps) {
    return (
        <header className="relative flex items-center border-b border-gray-100 bg-white px-4 py-4">
            <Link
                href={backHref}
                className="z-10 -ml-1 inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
                <ChevronLeftIcon className="h-4 w-4" />
                Back
            </Link>
            <h1 className="pointer-events-none absolute inset-x-0 text-center text-base font-semibold text-gray-900">
                {title}
            </h1>
        </header>
    );
}