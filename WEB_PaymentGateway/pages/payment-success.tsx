import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MobileFrame from '../components/layout/MobileFrame';
import BackHeader from '../components/layout/BackHeader';
import { useCart } from '../hooks/useCart';

export default function PaymentSuccess() {
  const router = useRouter();
  const { order_id } = router.query;
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <>
      <Head>
        <title>Payment Success | Payment Gateway</title>
      </Head>
      <MobileFrame>
        <BackHeader title="Confirmed" backHref="/" />
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
            <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mb-1 text-sm text-gray-500">Order ID</p>
          <p className="mb-8 rounded-lg bg-gray-50 px-4 py-2 font-mono text-sm font-semibold text-gray-800">
            {order_id}
          </p>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            Your order has been confirmed. Thank you for your purchase!
          </p>
          <Link
            href="/"
            className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </MobileFrame>
    </>
  );
}
