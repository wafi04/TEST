import { useProductByNotMe } from "../../api/products/products.get";
import { HeaderMainPage } from "../../components/ui/HeaderMainPage";
import { LoadingOverlay } from "../../components/ui/skeleton/LoadingOverlay";
import { ErrorComponent } from "../ErrrorComponent";
import { Slider } from "./Slider";

export function ProductSection() {
  const { products, isLoading, isError } = useProductByNotMe();

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (isError) {
    return <ErrorComponent />;
  }
  return (
    <section className="container  w-full space-y-6 mt-10">
      <HeaderMainPage title={"Featured Products"} />
      {products && <Slider data={products} />}
    </section>
  );
}
