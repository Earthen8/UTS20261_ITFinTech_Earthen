# UTS IT Financial Services (Ganjil 2026/2027)
**Nama:** Earthen  
**Mata Kuliah:** IT Financial Services  
**Program Studi:** S1 Digital Business Technology (Software Engineering)
**Dosen Pengampu:** Permata Nur M.R., Ph.D. (`permata.nmr@prasetiyamulya.ac.id`)  
**Repository:** `UTS20261_ITFinTech_Earthen`

---

## 📌 Deskripsi Project
Aplikasi **Payment Gateway Integration** berbasis Web yang mengintegrasikan alur checkout e-commerce sederhana dengan **Payment Gateway Xendit** dan database **MongoDB Atlas**. Dibangun menggunakan framework **Next.js (Page Router)**.

### 🌟 Fitur Utama
1. **Page 1 - Select Items (`/`)**:
   - Pencarian produk realtime & filter kategori (*All, Drinks, Snacks, Bundles*).
   - Badge keranjang belanja reaktif di header.
   - Penambahan item ke cart langsung dari card produk.
2. **Page 2 - Checkout (`/checkout`)**:
   - Rincian item yang dipilih beserta stepper kuantitas interaktif `[- qty +]`.
   - Perhitungan otomatis Subtotal, PPN (11%), dan Total.
   - Tombol navigasi menuju halaman pembayaran.
3. **Page 3 - Payment (`/payment`)**:
   - Form data pengiriman (*Full Name, Address, Phone Number*) dengan validasi input.
   - Pilihan metode pembayaran (*Credit/Debit Card, PayPal, Other*).
   - Ringkasan pesanan akhir (*Item(s), Shipping fee, Grand Total*).
   - Tombol **Confirm & Pay** yang membuat invoice Xendit dan menyimpan data ke MongoDB.
4. **Xendit Payment Gateway & Webhook Reconciliation**:
   - Otomatis membuat Xendit Invoice asli menggunakan `xendit-node` SDK.
   - Endpoint webhook `/api/webhook` menangani callback pembayaran secara asinkron dan otomatis memperbarui status transaksi menjadi **`PAID`** dan pesanan menjadi **`CONFIRMED`** di MongoDB.
5. **Post-Payment Return Flow**:
   - Redirect otomatis pasca-pembayaran ke `/payment-success` atau `/payment-failed`.
   - Pengosongan keranjang belanja (*cart reset*) otomatis setelah pembayaran terkonfirmasi.

---

## 🚀 Panduan Menjalankan Project (Quick Start)

Dosen / Penguji dapat menjalankan aplikasi secara lokal dengan 4 langkah mudah berikut:

### 1. Clone Repository & Masuk ke Folder Project
```bash
git clone https://github.com/Earthen8/UTS20261_ITFinTech_Earthen.git
cd UTS20261_ITFinTech_Earthen/WEB_PaymentGateway
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env.local`)
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Pastikan variabel `MONGODB_URI` dan `XENDIT_SECRET_KEY` terisi (key development Xendit & MongoDB Atlas connection string).

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack & Arsitektur
- **Frontend / Fullstack Framework:** Next.js 16 (Page Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS
- **Database / ODM:** MongoDB Atlas + Mongoose
- **Payment Gateway:** Xendit Node SDK (`xendit-node`)
- **Webhook Tunneling:** ngrok (untuk pengujian callback lokal)

---

## 🗄️ Skema Database MongoDB
- **`Product`**: Menyimpan master data produk (nama, kategori, harga, stok, deskripsi, image).
- **`Checkout`**: Menyimpan daftar item pesanan, subtotal, tax, shipping, total, serta status pesanan (`PENDING`, `CONFIRMED`, `CANCELLED`).
- **`Payment`**: Menyimpan detail transaksi pembayaran, referensi checkout, `externalId`, `xenditInvoiceId`, status (`PENDING`, `PAID`, `EXPIRED`), timestamp pembayaran, serta payload webhook Xendit mentah.

---

## 📡 API Endpoints
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET / POST` | `/api/products` | Mendapatkan katalog produk atau menambah produk baru |
| `GET / POST` | `/api/seed` | Melakukan auto-seeding katalog awal ke MongoDB |
| `POST` | `/api/payment/create` | Menyimpan Checkout & Payment ke MongoDB dan membuat Xendit Invoice |
| `GET` | `/api/payment/status` | Mengecek status pembayaran berdasarkan `order_id` |
| `POST` | `/api/webhook` | Webhook listener resmi untuk menerima callback event Xendit (`PAID`, `SETTLED`) |
