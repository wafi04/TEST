import { useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useSearchHooks() {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    if (!openSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    } else {
      setDebouncedSearch("");
    }
  };

  const handleSubmit = useCallback(() => {
    // Keep existing search params
    const currentParams = new URLSearchParams(searchParams);
    const paramsString = currentParams.toString();

    // Create the new URL with the search term in the path
    const searchPath = debouncedSearch.trim()
      ? `/p?q=${encodeURIComponent(debouncedSearch)}`
      : "/p";

    // Append other search params if they exist
    const finalURL = paramsString
      ? `${searchPath}?${paramsString}`
      : searchPath;

    navigate(finalURL);
    setOpenSearch(false);
  }, [debouncedSearch, navigate, searchParams]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return {
    debouncedSearch,
    setDebouncedSearch,
    openSearch,
    setOpenSearch,
    searchRef,
    inputRef,
    toggleSearch,
    handleKeyDown,
  };
}
