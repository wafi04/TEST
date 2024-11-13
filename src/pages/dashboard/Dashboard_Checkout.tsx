import { Package } from "lucide-react";
import { useGetCartTotalCheckout } from "../../api/cart/cart.query";
import { CartItem } from "../../types/cart";
import EachUtils from "../../utils/EachUtils";
import { HeaderDashboard } from "./components/Header-Dashboard";
import { Card, CardContent } from "../../components/ui/card";
import { FormatPrice } from "../../utils/format_Price";

export function DashboardCheckout() {
  const { data: checkoutItems } = useGetCartTotalCheckout();

  // Hitung total
  const totalItems = checkoutItems?.length || 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <HeaderDashboard
        title="Checkout"
        subTitle="Review and manage your checkout items"
      />
      <div className="grid md:grid-cols-3 gap-6">
        {/* Daftar Item Checkout */}
        <div className="md:col-span-2 space-y-4">
          {totalItems === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <Package className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No items in checkout. Start shopping!
              </p>
            </div>
          ) : (
            <EachUtils
              of={checkoutItems || []}
              render={(item: CartItem) => (
                <Card key={item.id} className="hover:shadow-sm transition-all">
                  <CardContent className="flex items-center p-4 space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        <span className="ml-4">Size: {item.size}</span>
                      </div>
                      <div className="mt-2 font-bold text-primary">
                        {FormatPrice(item.total, "IDR")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
