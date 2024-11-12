import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { InventoryItem } from "../../../types/products";

interface ProductInventoryFormProps {
  inventory: InventoryItem[];
  onAdd: (item: InventoryItem) => void;
  onRemove: (size: string) => void;
  onUpdate: (size: string, updates: Partial<InventoryItem>) => void;
}

export function ProductInventoryForm({
  inventory,
  onAdd,
  onRemove,
  onUpdate,
}: ProductInventoryFormProps) {
  const [newSize, setNewSize] = useState("");
  const [newStock, setNewStock] = useState<number>(0);

  const handleAddSizeStock = () => {
    if (newSize && newStock > 0) {
      onAdd({
        size: newSize,
        quantity: Number(newStock),
      });

      // Reset inputs
      setNewSize("");
      setNewStock(0);
    }
  };

  const handleRemoveSizeStock = (size: string) => {
    onRemove(size);
  };

  const handleStockChange = (size: string, quantity: number) => {
    onUpdate(size, { quantity });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Add Inventory Section */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 block">Size</Label>
          <Input
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Enter Size (e.g., 42, XL)"
            className="w-full"
          />
        </div>
        <div>
          <Label className="mb-2 block">Stock</Label>
          <Input
            type="number"
            value={newStock}
            inputMode="numeric"
            onChange={(e) => setNewStock(Number(e.target.value))}
            placeholder="Enter Stock"
            min="0"
            className="w-full"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSizeStock}
            disabled={!newSize || newStock <= 0}
            className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Size
          </Button>
        </div>
      </div>

      {/* Inventory List */}
      <div className="mt-6">
        <Label className="mb-4 block text-lg font-semibold">
          Current Inventory
        </Label>
        <ScrollArea className="h-64 border rounded-md">
          {inventory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 p-4">
              No inventory items added yet
            </div>
          ) : (
            <div className="divide-y">
              {inventory.map((item, index) => (
                <div
                  key={`${item.size}-${index}`}
                  className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50 transition-colors">
                  {/* Size Column */}
                  <div>
                    <Label className="text-xs text-gray-600 mb-1 block">
                      Size
                    </Label>
                    <Input
                      value={item.size}
                      readOnly
                      className="bg-gray-100 cursor-not-allowed "
                    />
                  </div>

                  {/* Stock Column */}
                  <div>
                    <Label className="text-xs text-gray-600 mb-1 block">
                      Stock
                    </Label>
                    <div className="flex">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleStockChange(item.size, Number(e.target.value))
                        }
                        min="0"
                        className="w-full rounded-r-none"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveSizeStock(item.size)}
                        className="rounded-l-none">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
