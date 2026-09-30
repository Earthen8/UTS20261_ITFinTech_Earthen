import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MobileFrame from '../components/layout/MobileFrame';
import SearchBar from '../components/product/SearchBar';
import CategoryTabs from '../components/product/CategoryTabs';
import ProductCard from '../components/product/ProductCard';
import CartToast from '../components/ui/CartToast';
import { CartIcon, MenuIcon } from '../components/ui/Icons';
import { useCart } from '../hooks/useCart';
import { PRODUCTS, type Category, type Product } from '../lib/products';

export default function SelectItemPage() {
  const { addItem, totalQuantity, ready } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = useCallback((productId: string) => {
    addItem(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToastProduct(product);
    setIsToastVisible(true);

    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, 2800);
  }, [addItem]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const cartCount = ready ? totalQuantity : 0;

  return (
    <>
      <Head>
        <title>Select Items | EKS Payment Gateway</title>
        <meta name="description" content="Browse and select items from our menu" />
      </Head>

      <MobileFrame>
        <h1 className="sr-only">Select Items</h1>

        {/* 1. Header: logo, cart + search */}
        <header className="sticky top-0 z-20 space-y-3.5 border-b border-[#e4ddd3] bg-[#faf8f5]/95 px-5 pb-3.5 pt-4 backdrop-blur-md sm:bg-white/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0ebe4] text-[#5c4f3a] transition hover:bg-[#e4ddd3] hover:text-[#2e261c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
              >
                <MenuIcon />
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="/eks-logo.png"
                  alt="EKS Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-extrabold tracking-tight text-[#2e261c]">EKS</span>
              </div>
            </div>

            <Link
              href="/checkout"
              aria-label={`Go to cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#5c4f3a] transition hover:bg-[#f0ebe4] hover:text-[#2e261c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
            >
              <CartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2d6a4f] px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <SearchBar value={query} onChange={setQuery} />
        </header>

        {/* 2. Category filter */}
        <CategoryTabs active={category} onChange={setCategory} />

        {/* 3. Product list */}
        {visibleProducts.length > 0 ? (
          <ul>
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
              />
            ))}
          </ul>
        ) : (
          <p className="px-5 py-16 text-center text-sm text-[#a0937f]">
            No products found. Try a different search or category.
          </p>
        )}

        <CartToast product={toastProduct} isVisible={isToastVisible} />
      </MobileFrame>
    </>
  );
}