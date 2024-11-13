// Komponen Kartu Produk Terperinci
import { ProductData } from "../../../../types/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { HandleOther } from "../../handler/products/Handler_other";
import { useState } from "react";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";
import { ProductSection } from "./Products.Details";
import { FormatText } from "../../../../utils/FormatDescription";

export function ProductCard({ product }: { product: ProductData }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="relative space-y-5">
        <div className="relative group">
          <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover 
                transition-all duration-700 
                group-hover:rotate-6 
                group-hover:scale-110 
                group-hover:brightness-90"
            />
          </div>
          {/*  MEMBERIKAN ovrlay saat hover */}
          <div
            className="absolute inset-0 bg-black/20 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 
            flex items-center justify-center"
            onClick={() => setOpen(true)}>
            <span className="text-white font-bold text-lg">Lihat Detail</span>
          </div>
        </div>
        <CardTitle className="mt-2">{product.name}</CardTitle>
        <CardDescription>
          {FormatText(product.description, {
            maxLength: 100,
          })}
        </CardDescription>{" "}
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            <Badge variant="secondary">{product.gender}</Badge>
            <Badge variant="secondary">{product.color}</Badge>
          </div>
          <HandleOther data={product} />
        </div>
      </CardContent>
      {open && (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <DialogContent className="max-w-4xl">
            <ProductSection product={product} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
