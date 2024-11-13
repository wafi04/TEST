import React, { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";

const MAX_FILE_SIZE = 5; // MB

interface ProductImageProps {
  imagePreview: string | null;
  onImageChange: (file: File) => void;
  onImageRemove: () => void;
  currentImage: string | null;
}

export function ProductImage({
  imagePreview,
  onImageChange,
  onImageRemove,
  currentImage,
}: ProductImageProps) {
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError("");

    // Check file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > MAX_FILE_SIZE) {
      setError(`File size must be less than ${MAX_FILE_SIZE}MB`);
      return false;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP files are allowed");
      return false;
    }

    return true;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && validateFile(file)) {
      try {
        onImageChange(file);
      } catch (err) {
        setError("Error uploading image. Please try again.");
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    onImageRemove();
    setError("");
  };

  const displayImage = imagePreview || currentImage;

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!displayImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <ImagePlus className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 font-medium">Click to upload image</p>
            <span className="text-sm text-gray-500">
              PNG, JPG, WEBP up to {MAX_FILE_SIZE}MB
            </span>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <img
            src={displayImage}
            alt="Product"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
          <div className="absolute top-2 right-2">
            <button
              onClick={handleRemoveImage}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
              aria-label="Remove image">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductImage;
