import Head from 'next/head';

export default function SelectItemPage() {
  return (
    <>
      <Head>
        <title>Select Items | Payment Gateway</title>
        <meta name="description" content="Select items and products" />
      </Head>

      <main className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
        {/* Container Utama (Frame Mobile / Responsive) */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Select Items</h1>

          {/* TODO: Implementasikan tampilan Select Item sesuai wireframe:
              1. Header (Logo & Search bar)
              2. Kategori filter (All, Drinks, Snacks, Bundles)
              3. Grid produk (Nama, Harga, Deskripsi singkat, tombol Add +)
          */}
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400">
            Placeholder: Implementasikan UI Select Item di sini
          </div>
        </div>
      </main>
    </>
  );
}
