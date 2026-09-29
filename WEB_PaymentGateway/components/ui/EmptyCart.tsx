import Link from 'next/link';

export default function EmptyCart() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div aria-hidden="true" className="text-5xl">🛒</div>
            <p className="font-semibold text-gray-800">Your cart is empty</p>
            <p className="text-sm text-gray-500">Pick a few items to continue.</p>
            <Link
                href="/"
                className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                Select Items
            </Link>
        </div>
    );
}