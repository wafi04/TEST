import { ButtonHighlight } from "../../components/ui/button/ButtonHighlight";
import { ProductComponent } from "./@components/products/Product_component";
import { HeaderDashboard } from "./components/Header-Dashboard";
import { FormProducts } from "./handler/products/Form-Products";

export function DashboardProduct() {
  return (
    <>
      <HeaderDashboard
        title="Products"
        subTitle="Manage your product inventory">
        <FormProducts>
          <ButtonHighlight className="border-10 font-bebas text-md w-30">
            Create Products
          </ButtonHighlight>
        </FormProducts>
      </HeaderDashboard>
      <ProductComponent />
    </>
  );
}
