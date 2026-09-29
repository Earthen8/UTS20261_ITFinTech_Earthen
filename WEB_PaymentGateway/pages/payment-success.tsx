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
        <BackHeader title="Success" backHref="/" />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mb-8 text-gray-600">
            Your order <span className="font-semibold text-gray-800">{order_id}</span> has been confirmed. Thank you for your purchase!
          </p>
          <Link
            href="/"
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Back to Home
          </Link>
        </div>
      </MobileFrame>
    </>
  );
}
