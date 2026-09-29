import Head from 'next/head';

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout | Payment Gateway</title>
        <meta name="description" content="Checkout and order summary" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
        {/* Container Utama (Frame Mobile / Responsive) */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Checkout</h1>

          {/* TODO: Implementasikan tampilan Checkout sesuai wireframe:
              1. Header tombol (< Back Checkout)
              2. List item belanja yang dipilih (Nama produk, quantity counter [- 2 +], subtotal)
              3. Rincian biaya (Subtotal, Tax, Total)
              4. Tombol navigasi (Continue to Payment →)
          */}
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400">
            Placeholder: Implementasikan UI Checkout di sini
          </div>
        </div>
      </main>
    </>
  );
}
