import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileFrame from '../components/layout/MobileFrame';
import BackHeader from '../components/layout/BackHeader';

export default function PaymentFailed() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <>
      <Head>
        <title>Payment Failed | Payment Gateway</title>
      </Head>
      <MobileFrame>
        <BackHeader title="Failed" backHref="/" />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Failed</h2>
          <p className="mb-8 text-gray-600">
            Your payment for order <span className="font-semibold text-gray-800">{order_id}</span> could not be processed or was cancelled. Please try again.
          </p>
          <Link
            href="/checkout"
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Try Again
          </Link>
        </div>
      </MobileFrame>
    </>
  );
}
