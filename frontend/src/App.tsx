import {
  ProtectedLayout,
  PublicLayout,
} from "./components/layouts/AuthLayouts";
import { Banner } from "./pages/main/Banner";
import { Categories } from "./pages/main/Categories";
import { ProductSection } from "./pages/main/ProductSection";

function App() {
  return (
    <PublicLayout className="relative">
      <Banner />
      <ProductSection />
      <Categories />
    </PublicLayout>
  );
}

export default App;
