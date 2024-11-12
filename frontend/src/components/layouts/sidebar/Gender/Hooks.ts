"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export type Gender = "men" | "women" | "all";

interface UseGenderProductProps {
  initialGender?: Gender;
}

// Custom hook for gender product filtering
export function useGenderProduct({
  initialGender = "all",
}: UseGenderProductProps = {}) {
  const [searchParams] = useSearchParams();
  const router = useNavigate();

  // Initialize state with URL parameter or default value
  const [selectedGender, setSelectedGender] = useState<Gender>(() => {
    const genderParam = searchParams?.get("gender") as Gender;
    return genderParam && ["men", "women", "all"].includes(genderParam)
      ? genderParam
      : initialGender;
  });

  // Handle gender changes and update URL
  const handleGenderChange = useCallback(
    (gender: Gender) => {
      setSelectedGender(gender);
      const newParams = new URLSearchParams(searchParams?.toString());

      if (gender === "all") {
        newParams.delete("gender");
      } else {
        newParams.set("gender", gender);
      }

      router(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  // Sync state with URL parameters
  useEffect(() => {
    const genderParam = searchParams?.get("gender") as Gender;
    if (genderParam && ["men", "women"].includes(genderParam)) {
      setSelectedGender(genderParam);
    } else if (!genderParam && selectedGender !== "all") {
      setSelectedGender("all");
    }
  }, [searchParams]);

  // Available gender options
  const genderOptions = useMemo(
    () => [
      { value: "all", label: "All" },
      { value: "man", label: "Men" },
      { value: "women", label: "Women" },
    ],
    []
  );

  // Filter products by gender
  const filterProductsByGender = useCallback(
    (products: any[]) => {
      if (selectedGender === "all") return products;
      return products.filter((product) => product.gender === selectedGender);
    },
    [selectedGender]
  );

  // Get label for gender value
  const getGenderLabel = useCallback(
    (genderValue: Gender) => {
      return (
        genderOptions.find((option) => option.value === genderValue)?.label ||
        ""
      );
    },
    [genderOptions]
  );

  return {
    selectedGender,
    setSelectedGender: handleGenderChange,
    genderOptions,
    filterProductsByGender,
    getGenderLabel,
  };
}
