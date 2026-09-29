import type { Product } from '../../lib/products';
import { formatCurrency } from '../../lib/format';
import ProductThumb from '../ui/ProductThumb';
import { PlusIcon } from '../ui/Icons';

interface ProductCardProps {
    product: Product;
    onAdd: (productId: string) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
    return (
        <li className="flex gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 transition-colors hover:bg-gray-50/60">
            <ProductThumb emoji={product.emoji} />
            <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="truncate text-[15px] font-semibold text-gray-900">{product.name}</h2>
                <p className="mt-0.5 text-sm font-semibold text-violet-600">{formatCurrency(product.price)}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">{product.description}</p>
                <button
                    type="button"
                    onClick={() => onAdd(product.id)}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-3 inline-flex items-center gap-1.5 self-end rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-1.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                    Add <PlusIcon className="h-3.5 w-3.5" />
                </button>
            </div>
        </li>
    );
}