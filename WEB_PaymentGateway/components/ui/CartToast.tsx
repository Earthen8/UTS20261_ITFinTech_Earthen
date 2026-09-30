import Link from 'next/link';
import type { Product } from '../../lib/products';
import { ArrowRightIcon } from './Icons';

interface CartToastProps {
  product: Product | null;
  isVisible: boolean;
}

export default function CartToast({ product, isVisible }: CartToastProps) {
  if (!product) return null;

  return (
    <aside
      aria-live="polite"
      aria-label="Notifikasi keranjang"
      className={`fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href="/checkout"
        className="flex items-center justify-between gap-3 rounded-2xl bg-gray-900/95 p-3.5 pl-4 text-white shadow-2xl backdrop-blur-md transition-all hover:bg-gray-900 active:scale-[0.98] border border-white/10"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
            <span>{product.emoji || '📦'}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-emerald-400">
              ✓ Berhasil ditambahkan
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {product.name}
            </p>
          </div>
        </div>

        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-500">
          <span>Keranjang</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </div>
      </Link>
    </aside>
  );
}
