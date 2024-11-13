// ProductBasicForm.tsx
import { ChangeEvent } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { CATEGORY, GENDER } from "../../../types/products";

interface ProductFormData {
  name: string;
  category: "RUNNING" | "JORDAN" | "BASKETBALL";
  gender: GENDER;
  price: number | string;
  color: string;
  description: string;
}

interface ProductBasicFormProps {
  formData: ProductFormData;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (field: keyof ProductFormData, value: string) => void;
}

export function ProductBasicForm({
  formData,
  onInputChange,
  onSelectChange,
}: ProductBasicFormProps) {
  return (
    <div className="space-y-4 h-[70vh] overflow-y-auto p-4">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Enter product name"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => onSelectChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {(["RUNNING", "JORDAN", "BASKETBALL"] as CATEGORY[]).map(
              (category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => onSelectChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {(["Men", "Women"] as GENDER[]).map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={onInputChange}
          placeholder="Enter price"
          min="0"
          step="0.01"
        />
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="text"
          name="color"
          value={formData.color}
          onChange={onInputChange}
          placeholder="Enter color"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Enter product description"
          rows={4}
        />
      </div>
    </div>
  );
}
