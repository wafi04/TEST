"use client";
import { useCallback } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";
import { Gender, useGenderProduct } from "./Hooks";

export function GenderFilterComponents() {
  const { selectedGender, setSelectedGender, genderOptions } =
    useGenderProduct();

  const handleCheckboxChange = useCallback(
    (gender: string) => {
      if (gender === selectedGender) {
        setSelectedGender("all");
      } else {
        setSelectedGender(gender as Gender);
      }
    },
    [selectedGender, setSelectedGender]
  );

  return (
    <AccordionItem value="gender" className="border-b">
      <AccordionTrigger className="py-4 font-medium">Gender</AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="flex flex-col space-y-3">
          {genderOptions
            .filter((option) => option.value !== "all")
            .map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={selectedGender === option.value}
                  onCheckedChange={() => handleCheckboxChange(option.value)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.label}
                </Label>
              </div>
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
