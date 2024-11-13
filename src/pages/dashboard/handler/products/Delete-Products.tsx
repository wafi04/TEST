import { DeleteProductMutation } from "../../../../api/products/products.crud";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

export function DeleteProductsForm({
  id,
  name,
  open,
  onclose,
}: {
  id: string;
  name: string;
  open: boolean;
  onclose: () => void;
}) {
  const deleteProducts = DeleteProductMutation();

  const handleDelete = () => {
    deleteProducts.mutate(id);
  };

  return (
    <Dialog open={open} onOpenChange={onclose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Product Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{name}"? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <Button variant="outline" onClick={onclose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
