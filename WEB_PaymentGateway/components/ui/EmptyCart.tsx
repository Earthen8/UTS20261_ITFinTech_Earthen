import Link from 'next/link';

export default function EmptyCart() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div aria-hidden="true" className="text-5xl">🛒</div>
            <p className="font-semibold text-[#2e261c]">Your cart is empty</p>
            <p className="text-sm text-[#7a6b52]">Pick a few items to continue.</p>
            <Link
                href="/"
                className="mt-2 rounded-xl bg-[#1b4332] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d6a4f] active:scale-[0.98]"
            >
                Select Items
            </Link>
        </div>
    );
}