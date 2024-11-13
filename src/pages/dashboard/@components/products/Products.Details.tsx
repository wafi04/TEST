import { Badge } from "../../../../components/ui/badge";
import { ProductData } from "../../../../types/products";
import { FormatPrice } from "../../../../utils/format_Price";

// Komponen Detail Produk
export function ProductSection({ product }: { product: ProductData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gambar Produk */}
        <div className="relative group">
          <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Informasi Produk */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <Badge variant="outline" className="text-md p-2">
              {FormatPrice(product.price, "IDR")}
            </Badge>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Kategori: {product.category}</Badge>
            <Badge variant="secondary">Warna: {product.color}</Badge>
            <Badge variant="secondary">Gender: {product.gender}</Badge>
          </div>

          {/* Stok Inventory */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2">Available Stok</h2>
            <div className="flex flex-wrap gap-2">
              {product.Inventory.map((stock) => (
                <Badge
                  key={stock.id}
                  variant={stock.quantity > 0 ? "default" : "destructive"}
                  className="text-sm">
                  Ukuran {stock.size}: {stock.quantity}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
