# Instalasi Proyek

Dokumen ini menjelaskan langkah-langkah untuk menginstal dan mengonfigurasi proyek Anda yang akan menggunakan komponen Produk.

## Prasyarat

Sebelum memulai, pastikan Anda memiliki hal-hal berikut:

- Node.js dan bun terinstal di sistem Anda.
- Teks editor atau IDE untuk pengembangan.

## Langkah-Langkah Instalasi

1. **Buat Proyek React Baru**:

   - Buka terminal dan jalankan perintah berikut untuk membuat proyek React baru:
     ```bash
     npx create-react-app my-project
     ```
   - Tunggu proses instalasi selesai.

2. **Instal Dependensi Tambahan**:

   - Masuk ke direktori proyek:
     ```bash
     cd my-project
     ```
   - Instal Tailwind CSS:
     ```bash
     bun add tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```
   - Instal Framer Motion:
     ```bash
     bun add framer-motion
     ```
   - Instal shadcn/ui:
     ```bash
     bun add @shadcn/ui
     ```
   - Instal React Query:
     ```bash
     bun add react-query
     ```
   - Instal komponen Produk:
     ```bash
     bun add @your-org/product-component
     ```

3. **Konfigurasi Tailwind CSS**:

   - Buka file `tailwind.config.js` dan tambahkan paths ke file sumber Anda:
     ```javascript
     module.exports = {
       content: ["./src/**/*.{js,jsx,ts,tsx}"],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```
   - Impor CSS Tailwind di `src/index.js`:
     ```javascript
     import "./index.css";
     ```
   - Buat file `src/index.css` dan tambahkan kode berikut:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

4. **Konfigurasi Framer Motion**:

   - Di file yang membutuhkan animasi, impor `motion` dari 'framer-motion':
     ```javascript
     import { motion } from "framer-motion";
     ```

5. **Konfigurasi React Query**:

   - Bungkus aplikasi Anda dengan `QueryClientProvider` di `src/index.js`:

     ```javascript
     import { QueryClient, QueryClientProvider } from "react-query";

     const queryClient = new QueryClient();

     ReactDOM.render(
       <React.StrictMode>
         <QueryClientProvider client={queryClient}>
           <AuthProvider>
             <RouterProvider router={Router} />
             <Toaster />
           </AuthProvider>
         </QueryClientProvider>
       </React.StrictMode>,
       document.getElementById("root")
     );
     ```

   - Gunakan React Query untuk mengambil data dari backend di komponen Produk.

Selesai! Proyek Anda sudah selesai dikonfigurasi, jadi Anda dapat mulai mengembangkan fitur-fiturnya.

Proyek Anda memiliki fitur-fitur berikut:

1. CRUD produk dari dashboard masing-masing pengguna.
2. Pencarian produk dari komponen utama produk, di mana produk yang ditampilkan bukan hanya yang di-CRUD dari dashboard masing-masing.
3. Fitur filter dan sorting produk.
4. Tampilan semua produk.
5. Tampilan produk berdasarkan kategori.

Semoga dokumentasi ini membantu Anda dalam menyiapkan proyek anda.
