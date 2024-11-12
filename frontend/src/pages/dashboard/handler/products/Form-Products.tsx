import { ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";
import {
  CreateProductMutation,
  UpdateProductMutation,
} from "../../../../api/products/products.crud";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import useProductState from "../../../../hooks/dashboard/products/use.test";
import { ProductData } from "../../../../types/products";
import { ProductFormSteps } from "../../form/ProductForm";

// props apa saja yang ingin digunakan di form products ini
interface FormProductsProps {
  initialData?: ProductData;
  open?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export function FormProducts({
  initialData,
  open,
  onClose,
  children,
}: FormProductsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const create = CreateProductMutation();

  const {
    formData,
    imagePreview,
    updateFormData,
    resetFormData,
    addProductImage,
    removeProductImage,
    addInventory,
    removeInventory,
    updateInventory,
  } = useProductState({ initialData });
  const update = UpdateProductMutation();
  const isFormChanged = useCallback(() => {
    if (initialData) {
      return (
        formData.name !== initialData.name ||
        formData.category !== initialData.category ||
        formData.gender !== initialData.gender ||
        formData.price !== initialData.price ||
        formData.color !== initialData.color ||
        formData.description !== initialData.description ||
        formData.image !== initialData.image
      );
    }
  }, [formData, initialData]);

  //  handle change digunakan untuk handle perubahan inputan
  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = e.target;

      // Handle numeric inputs
      if (name === "price") {
        updateFormData({ [name]: Number(value) });
        return;
      }

      // Handle other inputs
      updateFormData({ [name]: value });
    },
    [updateFormData]
  );
  const handleSelectChange = (field: keyof ProductData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleImageChange = (file: File) => {
    addProductImage(file);
  };

  const validateBasicForm = () => {
    const requiredFields = [
      "name",
      "category",
      "gender",
      "price",
      "color",
      "description",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (emptyFields.length > 0) {
      toast.error(`Please fill in: ${emptyFields.join(", ")}`);
      return false;
    }

    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    return true;
  };

  const validateImageForm = () => {
    if (!imagePreview && !formData.image) {
      toast.error("Please upload at least one product image");
      return false;
    }
    return true;
  };

  const validateInventoryForm = () => {
    if (formData.Inventory.length === 0) {
      toast.error("Please add at least one inventory item");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = validateBasicForm();
        break;
      case 1:
        isValid = validateImageForm();
        break;
      case 2:
        isValid = validateInventoryForm();
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };
  const handleSubmit = useCallback(async () => {
    try {
      if (initialData) {
        update.mutate({
          data: formData,
          productId: initialData.id,
        });
      } else {
        create.mutate(formData);
      }
      resetFormData();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  }, [formData, create, resetFormData, onClose, isFormChanged]);

  //  rangkaian multi step yang perlu digunakan untuk create products
  const steps = ["Basic Information", "Product Images", "Inventory"];
  //  cara biar ditekan enter bisa submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        // Jika bukan step terakhir, jalankan next step
        if (currentStep < steps.length - 1) {
          handleNextStep();
        }
        // Jika di step terakhir, jalankan submit
        else {
          handleSubmit();
        }
      }
    },
    [handleSubmit, handleNextStep, currentStep, steps.length]
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="bg-white max-w-xl"
        onKeyDown={handleKeyDown}
        tabIndex={0}>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            {steps[currentStep]} - Step {currentStep + 1} of {steps.length}
          </DialogDescription>
        </DialogHeader>

        <ProductFormSteps
          step={currentStep}
          onInputChange={handleChange}
          formData={formData}
          imagePreview={imagePreview}
          onSelectChange={handleSelectChange}
          onImageChange={handleImageChange}
          onImageRemove={removeProductImage}
          onInventoryAdd={addInventory}
          onInventoryRemove={removeInventory}
          onInventoryUpdate={updateInventory}
        />

        <DialogFooter className="flex w-full justify-between">
          {currentStep > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePrevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNextStep}
              className="ml-auto w-full"
              disabled={create.isPending}>
              Next
            </Button>
          ) : (
            <Button
              variant="default"
              className="ml-auto w-full"
              onClick={handleSubmit}
              disabled={create.isPending || update.isPending}>
              {create.isPending || update.isPending
                ? "Submitting..."
                : initialData
                ? "Update Product"
                : "Create Product"}{" "}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
