import Head from 'next/head';

export default function PaymentPage() {
  return (
    <>
      <Head>
        <title>Payment | Payment Gateway</title>
        <meta name="description" content="Secure payment gateway" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
        {/* Container Utama (Frame Mobile / Responsive) */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Secure Payment</h1>

          {/* TODO: Implementasikan tampilan Payment sesuai wireframe:
              1. Header (< Back Secure Checkout)
              2. Form Shipping Address
              3. Pilihan Payment Method (Credit/Debit Card, PayPal, Other / Xendit)
              4. Order Summary (Item(s), Shipping, Total)
              5. Tombol eksekusi (Confirm & Pay)
          */}
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400">
            Placeholder: Implementasikan UI Payment di sini
          </div>
        </div>
      </main>
    </>
  );
}
