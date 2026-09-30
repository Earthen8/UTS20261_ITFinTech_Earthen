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
        <title>Checkout | EKS Payment Gateway</title>
        <meta name="description" content="Review your cart and checkout" />
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
                  className="flex items-center gap-4 border-b border-[#e4ddd3]/60 px-5 py-4"
                >
                  <ProductThumb imageUrl={product.imageUrl} emoji={product.emoji} size="md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate text-sm font-semibold text-[#2e261c]">{product.name}</p>
                    <QuantityStepper
                      value={quantity}
                      productName={product.name}
                      onChange={(next) => setQuantity(product.id, next)}
                    />
                  </div>
                  <p className="shrink-0 text-sm font-bold text-[#1b4332]">
                    {formatCurrency(lineTotal)}
                  </p>
                </li>
              ))}
            </ul>

            {/* 3. Cost breakdown */}
            <dl className="space-y-3 rounded-2xl bg-[#f0ebe4]/60 px-5 py-5 mx-5 my-4 border border-[#e4ddd3]/50">
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4332] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d6a4f] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] focus-visible:ring-offset-2"
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