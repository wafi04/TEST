import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

//    layout design for notfound page
export function LayoutNotFound() {
  //  untuk navigasi   page
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* ikon not found*/}
        <div className="relative">
          <SearchX className="w-24 h-24 text-blue-500 mx-auto animate-bounce" />
          <span className="absolute top-0 right-1/3 text-6xl font-bold text-gray-200">
            404
          </span>
        </div>

        {/* content utama */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 text-lg">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
            dipindahkan.
          </p>
        </div>

        {/* button navigasi*/}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </button>
        </div>

        {/* link pembantu */}
        <div className="mt-12 text-gray-600">
          <p className="mb-4">Beberapa tautan yang mungkin membantu:</p>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-blue-500 hover:underline">
                Beranda
              </a>
            </li>
            <li>
              <a href="/p" className="text-blue-500 hover:underline">
                Produk
              </a>
            </li>
            <li>
              <a href="/auth/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LayoutNotFound;
