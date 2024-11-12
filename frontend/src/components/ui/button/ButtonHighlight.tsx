import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonHighlightVariants = cva(
  " border  rounded-md shadow-[4px_4px_0_0_#fff,4px_4px_0_1px_#000] box-border cursor-pointer inline-block font-sans text-[14px] font-normal leading-5 mx-[5px] mb-2 p-3 px-10 text-center align-middle whitespace-nowrap hover:no-underline focus:no-underline active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.125)] active:outline-none active:translate-x-[2px] active:translate-y-[2px] md:px-12",
  {
    variants: {
      variant: {
        default: "before:bg-primary  bg-black  text-white",
        destructive: "bg-destructive before:bg-destructive",
        outline: "bg-background before:bg-background text-foreground",
        secondary: "bg-secondary before:bg-secondary",
        ghost: "border-transparent before:bg-transparent hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline before:bg-transparent",
      },
      size: {
        default: "",
        sm: "text-sm",
        lg: "text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonHighlightProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonHighlightVariants> {
  asChild?: boolean;
  space?: string;
}

const ButtonHighlight = React.forwardRef<
  HTMLButtonElement,
  ButtonHighlightProps
>(
  (
    { className, variant, size, asChild = false, space, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="relative inline-block group">
        <Comp
          className={cn(buttonHighlightVariants({ variant, size, className }))}
          ref={ref}
          {...props}>
          <span
            className={cn(
              "inline-flex space-x-4 items-center justify-center w-full transition-transform duration-200 ease-in-out",
              space
            )}>
            {children}
          </span>
        </Comp>
      </div>
    );
  }
);
ButtonHighlight.displayName = "ButtonHighlight";

export { ButtonHighlight, buttonHighlightVariants };
