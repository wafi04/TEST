import { Accordion } from "../../components/ui/accordion";
import { GenderFilterComponents } from "./sidebar/Gender/Gender_Filter_Components";
import { PriceFilterComponent } from "./sidebar/price/Price_Filter_Components";

export function SidebarFilter() {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-[73px] overflow-y-auto max-h-[calc(100vh-73px)] bg-background p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <Accordion type="multiple" className="w-full">
          <GenderFilterComponents />
          <PriceFilterComponent />
          {/* <ColorComponents /> */}
        </Accordion>
      </div>
    </div>
  );
}
