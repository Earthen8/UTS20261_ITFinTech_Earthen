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
        <title>Payment Failed | EKS Payment Gateway</title>
      </Head>
      <MobileFrame>
        <BackHeader title="Failed" backHref="/" />
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60">
            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-[#2e261c]">Payment Failed</h2>
          <p className="mb-1 text-sm text-[#7a6b52]">Order ID</p>
          <p className="mb-8 rounded-xl bg-[#f0ebe4] px-4 py-2 font-mono text-sm font-semibold text-[#2e261c]">
            {order_id}
          </p>
          <p className="mb-8 text-sm leading-relaxed text-[#7a6b52]">
            Your payment could not be processed or was cancelled. Please try again.
          </p>
          <Link
            href="/checkout"
            className="w-full rounded-xl bg-[#2e261c] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#45392a] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c4f3a] focus-visible:ring-offset-2"
          >
            Try Again
          </Link>
        </div>
      </MobileFrame>
    </>
  );
}
