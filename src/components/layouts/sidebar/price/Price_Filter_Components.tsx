"use client";

import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { priceOptions, usePrice } from "./Hooks";

export function PriceFilterComponent() {
  const { setPriceById, resetPriceFilter } = usePrice();
  const [searchParams] = useSearchParams();

  // Get selected ID directly from URL
  const selectedOptionId = searchParams.get("price");

  // Handle checkbox change dengan update URL langsung
  const handleCheckboxChange = (optionId: string) => {
    if (selectedOptionId === optionId) {
      resetPriceFilter();
    } else {
      setPriceById(optionId);
    }
  };

  const isAnyFilterActive = selectedOptionId !== null;

  return (
    <AccordionItem value="price" className="border-b">
      <AccordionTrigger className="py-4 font-medium">Price</AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="flex flex-col space-y-3">
          <div className="space-y-2">
            {priceOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptionId === option.id}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {isAnyFilterActive && (
            <button
              onClick={() => {
                resetPriceFilter();
              }}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2">
              Clear Price Filter
            </button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
