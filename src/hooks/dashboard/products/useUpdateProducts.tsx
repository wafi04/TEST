import { useState, useCallback } from "react";
import { ProductData } from "../../../types/products";

interface UseUpdateProductsProps {
  initialData: ProductData;
}

export function useUpdateProducts({ initialData }: UseUpdateProductsProps) {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    name: initialData.name || "",
    category: initialData.category || "",
    price: initialData.price || 0,
    image: initialData.image || "",
    description: initialData.description || "",
    color: initialData.color || "",
    gender: initialData.gender || "",
    sellerId: initialData.sellerId || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    initialData.image || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
          setError("Please upload a valid image file (JPEG, PNG, or WebP)");
          return;
        }

        // Validate file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          setError("Image size should be less than 5MB");
          return;
        }

        setImageFile(file);
        setError(null);

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        // Clean up old preview URL when component unmounts
        return () => URL.revokeObjectURL(previewUrl);
      }
    },
    []
  );

  const resetForm = () => {
    setFormData({
      id: initialData.id,
      name: initialData.name || "",
      category: initialData.category || "",
      price: initialData.price || 0,
      image: initialData.image || "",
      description: initialData.description || "",
      color: initialData.color || "",
      gender: initialData.gender || "",
      sellerId: initialData.sellerId || "",
    });
    setImageFile(null);
    setImagePreview(initialData.image || "");
    setError(null);
  };

  const isFormChanged = () => {
    return (
      formData.name !== initialData.name ||
      formData.category !== initialData.category ||
      formData.price !== initialData.price ||
      formData.description !== initialData.description ||
      formData.color !== initialData.color ||
      formData.gender !== initialData.gender ||
      formData.sellerId !== initialData.sellerId ||
      imageFile !== null
    );
  };

  return {
    formData,
    handleChange,
    setFormData,
    handleImageChange,
    resetForm,
    isLoading,
    error,
    isFormChanged,
    imagePreview,
    imageFile,
  };
}
