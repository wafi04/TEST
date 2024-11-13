// Hooks.ts
import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Constants
export const MAX_PRICE = 2000000;
export const MIN_PRICE = 0;

// Interfaces
interface PriceRange {
  min: number;
  max: number;
}

interface UsePriceReturn {
  selectedPriceRange: PriceRange;
  setPriceById: (id: string | null) => void;
  resetPriceFilter: () => void;
  MIN_PRICE: number;
  MAX_PRICE: number;
}

// Price options yang dipindah ke Hooks agar bisa dipakai untuk mapping
export const priceOptions = [
  {
    id: "under-1m",
    min: 0,
    max: 1000000,
    label: "Under 1,000,000",
  },
  {
    id: "1m-2m",
    min: 1000000,
    max: 2000000,
    label: "1,000,000 - 2,000,000",
  },
  {
    id: "above-2m",
    min: 2000000,
    max: MAX_PRICE,
    label: "Above 2,000,000",
  },
];

export function usePrice(): UsePriceReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get initial price range based on price_id from URL
  const getPriceRangeFromId = (id: string | null): PriceRange => {
    const option = priceOptions.find((opt) => opt.id === id);
    return option
      ? { min: option.min, max: option.max }
      : { min: MIN_PRICE, max: MAX_PRICE };
  };

  // Initialize from URL using price_id
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>(
    () => {
      const urlPriceId = searchParams.get("price_id");
      return getPriceRangeFromId(urlPriceId);
    }
  );

  // Update state when URL params change
  useEffect(() => {
    const urlPriceId = searchParams.get("price_id");
    setSelectedPriceRange(getPriceRangeFromId(urlPriceId));
  }, [searchParams]);

  const setPriceById = useCallback(
    (id: string | null) => {
      const newRange = getPriceRangeFromId(id);
      setSelectedPriceRange(newRange);

      const current = new URLSearchParams(searchParams);

      if (id) {
        current.set("price", id);
      } else {
        current.delete("price");
      }

      const queryString = current.toString();
      navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, {
        replace: true,
      });
    },
    [location.pathname, navigate, searchParams]
  );

  // Reset price filter
  const resetPriceFilter = useCallback(() => {
    setSelectedPriceRange({ min: MIN_PRICE, max: MAX_PRICE });

    const current = new URLSearchParams(searchParams);
    current.delete("price");
    current.delete("min");
    current.delete("max");

    const queryString = current.toString();

    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, {
      replace: true,
    });
  }, [location.pathname, navigate, searchParams]);

  return {
    selectedPriceRange,
    setPriceById,
    resetPriceFilter,
    MIN_PRICE,
    MAX_PRICE,
  };
}
