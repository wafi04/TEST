// Impor hook dari react-query untuk manajemen state query
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../constant";
import { ProductData, SearchProductsResults } from "../../types/products";
import { QuerySearch } from "../../types/search";
import { API_RESPONSE } from "../../types/types.utils";

// Kelas layanan untuk menangani operasi terkait produk
export class ProductDataService {
  // Metode untuk mengambil produk milik pengguna yang sedang login
  async getProductByUser() {
    // Lakukan permintaan GET ke endpoint produk pengguna
    const response = await fetch(`${BASE_URL}/product/user`, {
      method: "GET", // Tentukan metode HTTP sebagai GET
      headers: {
        // Tetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }
  async getProductByUserNotMe() {
    // Lakukan permintaan GET ke endpoint produk pengguna
    const response = await fetch(`${BASE_URL}/product/notme`, {
      method: "GET", // Tentukan metode HTTP sebagai GET
      headers: {
        // Tetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }

  // Metode untuk mengambil produk berdasarkan ID produk
  async getProductbyId(productId: string) {
    // Lakukan permintaan GET ke endpoint produk dengan ID spesifik
    const response = await fetch(`${BASE_URL}/product/product/${productId}`, {
      method: "GET", // Tentukan metode HTTP sebagai GET
      headers: {
        // Tetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }

  // Metode untuk membuat produk baru
}

// Buat instance dari layanan produk untuk digunakan di seluruh aplikasi
const GetProduct = new ProductDataService();

export function useProductByUser() {
  // Gunakan generic type untuk memastikan tipe data
  const query = useQuery<API_RESPONSE<ProductData[]>, Error>({
    // Gunakan query key yang unik
    queryKey: ["products", "user"],

    // Fungsi query
    queryFn: () => GetProduct.getProductByUser(),
    //   mencoba akases ke api seklai jika gagal
    retry: 1,
    gcTime: 5 * 60 * 1000,
  });

  // Return objek dengan struktur yang jelas
  return {
    products: query.data?.data || [], // Akses data produk
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
export function useProductByNotMe(params?: QuerySearch) {
  // Gunakan generic type untuk memastikan tipe data
  const { data, isLoading, error, isFetching, status } = useQuery<
    API_RESPONSE<SearchProductsResults>,
    Error
  >({
    queryKey: ["products", "notme", params],
    queryFn: async ({ pageParam = null }) => {
      const queryParams = new URLSearchParams();

      if (pageParam) {
        queryParams.append("cursor", pageParam as string);
      }

      if (params?.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }

      // Add search term
      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.gender) {
        queryParams.append("gender", params.gender);
      }

      // Add other filters with type checking
      if (params?.limit && !isNaN(params?.limit)) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params?.minPrice && !isNaN(params?.minPrice as number)) {
        queryParams.append("minPrice", params.minPrice.toString());
      }
      if (params?.maxPrice && !isNaN(params?.maxPrice as number)) {
        queryParams.append("maxPrice", params.maxPrice.toString());
      }
      if (params?.color) {
        queryParams.append("color", params.color);
      }
      const url = `${BASE_URL}/product/notme?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Received data:", responseData);
      return responseData;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    products: data?.data.products,
    isLoading,
    count: data?.data.totalCount,
    status,
    isFetching,
    error,
    isError: error,
  };
}
export function useProductById(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      // Pastikan mengembalikan struktur API_RESPONSE
      const product = await GetProduct.getProductbyId(productId);
      return {
        data: product,
        message: "Success",
        status: 200,
        timestamp: new Date().toISOString(),
      };
    },
    retry: 1,
    gcTime: 5 * 60 * 1000,
  });
}

export function useGetAllProductsBySearch(params: QuerySearch) {
  const { data, isLoading, error, isFetching, status } = useQuery<
    API_RESPONSE<SearchProductsResults>,
    Error
  >({
    queryKey: ["products", "search", params],
    queryFn: async ({ pageParam = null }) => {
      const queryParams = new URLSearchParams();

      if (pageParam) {
        queryParams.append("cursor", pageParam as string);
      }

      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }

      // Add search term
      if (params.search) {
        queryParams.append("search", params.search);
      }
      if (params.gender) {
        queryParams.append("gender", params.gender);
      }

      // Add other filters with type checking
      if (params.limit && !isNaN(params.limit)) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params.minPrice && !isNaN(params.minPrice as number)) {
        queryParams.append("minPrice", params.minPrice.toString());
      }
      if (params.maxPrice && !isNaN(params.maxPrice as number)) {
        queryParams.append("maxPrice", params.maxPrice.toString());
      }
      if (params.color) {
        queryParams.append("color", params.color);
      }
      const url = `${BASE_URL}/product/search?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Received data:", responseData);
      return responseData;
    },
    enabled: !!params.search,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  console.log("Received search term:", params.search);

  return {
    data: data?.data.products,
    isLoading,
    count: data?.data.totalCount,
    status,
    isFetching,
    error,
  };
}
