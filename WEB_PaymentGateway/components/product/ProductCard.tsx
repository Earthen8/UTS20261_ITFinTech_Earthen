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
        <li className="flex gap-4 border-b border-gray-200 px-5 py-4 last:border-b-0">
            <ProductThumb emoji={product.emoji} />
            <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="truncate text-base font-semibold text-gray-900">{product.name}</h2>
                <p className="mt-0.5 text-sm font-semibold text-indigo-600">{formatCurrency(product.price)}</p>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>
                <button
                    type="button"
                    onClick={() => onAdd(product.id)}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-auto inline-flex items-center gap-1 self-end rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                    Add <PlusIcon className="h-4 w-4" />
                </button>
            </div>
        </li>
    );
}