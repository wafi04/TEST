import { useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchHooks } from "../../../hooks/search/useSearch";
import { useGetAllProductsBySearch } from "../../../api/products/products.get";
import { Input } from "../input";
import { OpenSearch } from "./OpenSearch";

export default function SearchInput() {
  const {
    debouncedSearch,
    handleKeyDown,
    inputRef,
    openSearch,
    searchRef,
    setDebouncedSearch,
    setOpenSearch,
    toggleSearch,
  } = useSearchHooks();
  const { data, isFetching, status } = useGetAllProductsBySearch({
    search: debouncedSearch,
    limit: 6,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
        setDebouncedSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openSearch]);

  return (
    <div ref={searchRef} className="relative">
      {!openSearch && (
        <div
          className="relative max-w-md flex cursor-pointer"
          onClick={toggleSearch}>
          <Search className="absolute right-0 rounded-full p-2 bg-gray-300 top-0 size-10 text-gray-100" />
          <Input
            readOnly
            placeholder="Search"
            className="w-full bg-gray-100 cursor-pointer rounded-full pr-10 focus:outline-none"
          />
        </div>
      )}
      {openSearch && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <OpenSearch
            data={data}
            status={status}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
            toogleSearch={toggleSearch}
            isLoading={isFetching}
            search={debouncedSearch}
            setSearch={setDebouncedSearch}
          />
        </div>
      )}
    </div>
  );
}
