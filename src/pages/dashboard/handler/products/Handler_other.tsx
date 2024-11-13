import React, { useState } from "react";
import { Ellipsis, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { ProductData } from "../../../../types/products";
import { DeleteProductsForm } from "./Delete-Products";
import { FormProducts } from "./Form-Products";

export const HandleOther = ({ data }: { data: ProductData }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpen = (type: "delete" | "update") => {
    if (type === "update") {
      setOpenUpdate(true);
    } else {
      setOpenDelete(true);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-slate-300">
            <Ellipsis className="h-4 w-4 text-slate-600" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-20">
          <DropdownMenuItem
            onClick={() => handleOpen("update")}
            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-slate-100">
            <Pencil className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleOpen("delete")}
            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-slate-100 text-red-600">
            <Trash2 className="h-4 w-4" />
            <span className="text-sm font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openUpdate && (
        <FormProducts
          initialData={data}
          onClose={() => setOpenUpdate(false)}
          open={openUpdate}
        />
      )}

      {openDelete && (
        <DeleteProductsForm
          id={data.id}
          name={data.name}
          onclose={() => setOpenDelete(false)}
          open={openDelete}
        />
      )}
    </>
  );
};

export default HandleOther;
