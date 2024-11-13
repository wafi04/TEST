import { Loader2, Search, X } from "lucide-react";
import { ProductData } from "../../../types/products";
import { Button } from "../button";
import { Input } from "../input";
import { SearchModal } from "./SearchModal";

interface OpenSearchProps {
  inputRef: React.RefObject<HTMLInputElement>;
  search: string;
  isLoading: boolean;
  status: "error" | "success" | "pending";
  data: ProductData[] | undefined;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  toogleSearch: () => void;
}

export function OpenSearch({
  data,
  inputRef,
  isLoading,
  search,
  status,
  handleKeyDown,
  setSearch,
  toogleSearch,
}: OpenSearchProps) {
  return (
    <>
      <div className="flex-none p-4 border-b">
        <div className="relative flex items-center max-w-3xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={search}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xl py-3 pl-12 pr-12 bg-gray-100 rounded-full focus:ring-0"
          />
          <Button
            onClick={toogleSearch}
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-gray-200">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-6 flex">
          {/* Suggestions Section - Always visible */}
          <div className="w-1/4 pr-4">
            <h3 className="text-lg font-semibold mb-2">Most Relevant</h3>
            {data &&
              data.slice(3, 6).map((item) => (
                <a href={`/p/${item.id}`} key={item.id}>
                  <div className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </a>
              ))}
          </div>

          {/* Products Grid Section with Loader */}
          <div className="w-3/4">
            <div className="grid grid-cols-3 gap-4">
              {data &&
                data
                  .slice(0, 3)
                  .map((item, idx) => (
                    <SearchModal
                      status={status}
                      isLoading={isLoading}
                      product={item}
                      key={idx}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
