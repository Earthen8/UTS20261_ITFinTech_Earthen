import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import MobileFrame from '../components/layout/MobileFrame';
import SearchBar from '../components/product/SearchBar';
import CategoryTabs from '../components/product/CategoryTabs';
import ProductCard from '../components/product/ProductCard';
import { CartIcon, MenuIcon } from '../components/ui/Icons';
import { useCart } from '../hooks/useCart';
import { PRODUCTS, type Category } from '../lib/products';

export default function SelectItemPage() {
  const { addItem, totalQuantity, ready } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');

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
        <title>Select Items | Payment Gateway</title>
        <meta name="description" content="Select items and products" />
      </Head>

      <MobileFrame>
        <h1 className="sr-only">Select Items</h1>

        {/* 1. Header: menu, logo, cart + search */}
        <header className="space-y-4 px-5 pb-4 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <MenuIcon />
              </button>
              <span className="text-lg font-bold tracking-tight text-gray-900">PayGate</span>
            </div>

            <Link
              href="/checkout"
              aria-label={`Go to cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <CartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white">
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
              <ProductCard key={product.id} product={product} onAdd={addItem} />
            ))}
          </ul>
        ) : (
          <p className="px-5 py-16 text-center text-sm text-gray-400">
            No products found. Try a different search or category.
          </p>
        )}
      </MobileFrame>
    </>
  );
}