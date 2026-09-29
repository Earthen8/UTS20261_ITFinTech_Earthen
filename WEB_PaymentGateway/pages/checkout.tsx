import Head from 'next/head';
import Link from 'next/link';
import MobileFrame from '../components/layout/MobileFrame';
import BackHeader from '../components/layout/BackHeader';
import EmptyCart from '../components/ui/EmptyCart';
import PriceRow from '../components/ui/PriceRow';
import ProductThumb from '../components/ui/ProductThumb';
import QuantityStepper from '../components/ui/QuantityStepper';
import { ArrowRightIcon } from '../components/ui/Icons';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/format';
import { calculateTotals, TAX_RATE } from '../lib/pricing';

export default function CheckoutPage() {
  const { ready, lines, subtotal, setQuantity } = useCart();
  const totals = calculateTotals(subtotal);
  const hasItems = lines.length > 0;

  return (
    <>
      <Head>
        <title>Checkout | Payment Gateway</title>
        <meta name="description" content="Checkout and order summary" />
      </Head>

      <MobileFrame>
        {/* 1. Header */}
        <BackHeader title="Checkout" backHref="/" />

        {!ready ? (
          <div className="flex-1" aria-busy="true" />
        ) : !hasItems ? (
          <EmptyCart />
        ) : (
          <>
            {/* 2. Selected items */}
            <ul>
              {lines.map(({ product, quantity, lineTotal }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 border-b border-gray-100 px-5 py-4"
                >
                  <ProductThumb emoji={product.emoji} size="md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
                    <QuantityStepper
                      value={quantity}
                      productName={product.name}
                      onChange={(next) => setQuantity(product.id, next)}
                    />
                  </div>
                  <p className="shrink-0 text-sm font-bold text-gray-900">
                    {formatCurrency(lineTotal)}
                  </p>
                </li>
              ))}
            </ul>

            {/* 3. Cost breakdown */}
            <dl className="space-y-3 rounded-xl bg-gray-50 px-5 py-5 mx-5 my-4">
              <PriceRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
              <PriceRow
                label={`Tax (${Math.round(TAX_RATE * 100)}%)`}
                value={formatCurrency(totals.tax)}
              />
              <PriceRow label="Total" value={formatCurrency(totals.total)} strong />
            </dl>

            {/* 4. Navigation */}
            <div className="px-5 pb-6">
              <Link
                href="/payment"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              >
                Continue to Payment <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </MobileFrame>
    </>
  );
}