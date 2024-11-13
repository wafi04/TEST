import { Filter, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSidebar } from "../../../hooks/useSidebar";

interface HeaderSearchProps {
  title: string;
  count: number;
}

export function HeaderSearch({ count, title }: HeaderSearchProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 bg-white border-b border-gray-200 w-full 
        ${isScrolled ? "shadow-md" : ""}
        transition-all duration-300 ease-in-out`}>
      <div className="max-w-[2000px] mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl sm:text-3xl font-bold  font-bebas text-gray-900">
              {title}
            </h1>
            <span className="text-sm text-gray-500">({count})</span>
          </div>
          <Filters />
        </div>
      </div>
    </div>
  );
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: High-Low", value: "price_desc" },
  { label: "Price: Low-High", value: "price_asc" },
] as const;

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "featured";
  const { onOpen, onClose, show } = useSidebar();
  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sortBy", value);
    setSearchParams(newSearchParams);
  };

  // Find the current sort option label
  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label ||
    "Sort By";

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        onClick={show ? onClose : onOpen} // Memanggil onOpen atau onClose berdasarkan status
        className="text-sm font-medium text-gray-700 hover:bg-gray-50">
        <Filter className="h-4 w-4 mr-2" />
        {show ? `Hide` : "Show"} Filter
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-sm font-medium text-gray-700 hover:bg-gray-50">
            {currentSortLabel}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={`text-sm ${
                currentSort === option.value ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSortChange(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
