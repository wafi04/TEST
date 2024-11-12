import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { BASE_URL } from "../../constant";
import useProductState from "../../hooks/dashboard/products/use.test";
import { storage } from "../../lib/firebase";
import {
  CreateInventoryType,
  ProductData,
  ProductFormData,
} from "../../types/products";
import { ErrorResponse } from "../auth/auth.login"; // Cek error dari response axios atau error biasa

export class ProductService {
  //
  private async uploadImage(file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      toast.error("error upload image");
      throw error;
    }
  }

  private async getImageUrl(
    image: string | File | null
  ): Promise<string | null> {
    // jika image berbbentuk file maka dia dimasukkan ke dalam firebase untuk dieksekusi
    if (image instanceof File) {
      return this.uploadImage(image);
      // jika dia berbentuk string maka dia return image tersebut
    } else if (typeof image === "string") {
      return image;
    }
    return null;
  }

  async create(data: ProductFormData) {
    try {
      // Clone data untuk menghindari mutasi langsung
      const processedData = { ...data };

      // Proses upload gambar terlebih dahulu
      let imageUrl;
      if (processedData.image) {
        imageUrl = await this.getImageUrl(processedData.image);
      }
      // Prepare data for sending (hanya kirim src dan isMain)
      const preparedData = {
        ...processedData,
        image: imageUrl,
      };
      if (!imageUrl) return;
      // Kirim data ke server
      const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(preparedData),
      });

      // Cek response
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorBody}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  }

  // Metode untuk memperbarui produk
  async updateProduct(productId: string, data: ProductFormData) {
    // Lakukan permintaan PUT ke endpoint pembaruan produk
    const processedData = { ...data };

    // Proses upload gambar terlebih dahulu
    let imageUrl;
    if (processedData.image) {
      imageUrl = await this.getImageUrl(processedData.image);
    }

    // Prepare data for sending (hanya kirim src dan isMain)
    const preparedData = {
      ...processedData,
      image: imageUrl,
    };
    if (!imageUrl) return;
    const response = await fetch(`${BASE_URL}/product/${productId}`, {
      method: "PUT", // Tentukan metode HTTP sebagai PUT
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
      body: JSON.stringify(preparedData), // Konversi data produk ke JSON
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Periksa apakah terjadi kesalahan pada server
    if (!response.ok) {
      // Lempar error dengan pesan dari server jika gagal
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal memperbarui produk");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }

  // Metode untuk menghapus produk
  async deleteProduct(productId: string) {
    // Lakukan permintaan DELETE ke endpoint penghapusan produk
    const response = await fetch(`${BASE_URL}/product/${productId}`, {
      method: "DELETE", // Tentukan metode HTTP sebagai DELETE
      credentials: "include", // Sertakan kredensial untuk autentikasi
      headers: {
        // Menetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Periksa apakah terjadi kesalahan pada server
    if (!response.ok) {
      // throw  error dengan pesan dari server jika gagal
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menghapus produk");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }
}

const products = new ProductService();

export function CreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (data: ProductFormData) => products.create(data),
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "products create failed";

      queryClient.cancelQueries({ queryKey: ["products"] });
      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: () => {
      toast.success("Created successful");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function UpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["products", "update"],
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: ProductFormData;
    }) => products.updateProduct(productId, data),
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Product update failed";

      queryClient.cancelQueries({ queryKey: ["products"] });
      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: (updatedProduct) => {
      toast.success("Product updated successfully");
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Update the specific product in the cache
      queryClient.setQueryData(["products", updatedProduct.id], updatedProduct);
    },
  });
}

// Mutation untuk Delete Product
export function DeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "delete"],
    mutationFn: (productId: string) => products.deleteProduct(productId),
    onError: (error: ErrorResponse) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Product deletion failed";

      toast.error(`Error: ${errorMessage}`);
    },
    onSuccess: (_, productId) => {
      toast.success("Product deleted successfully");

      // Invalidate products queries
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Delete product yang berkaitan dengan id product ini
      queryClient.setQueryData(
        ["products"],
        (oldData: ProductData[] | undefined) =>
          oldData?.filter((product) => product.id !== productId)
      );
    },
  });
}
