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
        <li className="flex gap-4 border-b border-[#e4ddd3]/60 px-5 py-4 last:border-b-0 transition-colors hover:bg-[#f0ebe4]/40">
            <ProductThumb imageUrl={product.imageUrl} emoji={product.emoji} />
            <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="truncate text-[15px] font-semibold text-[#2e261c]">{product.name}</h2>
                <p className="mt-0.5 text-sm font-bold text-[#2d6a4f]">{formatCurrency(product.price)}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#7a6b52]">{product.description}</p>
                <button
                    type="button"
                    onClick={() => onAdd(product.id)}
                    aria-label={`Add ${product.name} to cart`}
                    className="mt-3 inline-flex items-center gap-1.5 self-end rounded-xl border border-[#2d6a4f]/20 bg-[#ecf5ee] px-3.5 py-1.5 text-sm font-semibold text-[#1b4332] transition hover:bg-[#d4ead8] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                >
                    Add <PlusIcon className="h-3.5 w-3.5" />
                </button>
            </div>
        </li>
    );
}