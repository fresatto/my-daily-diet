import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardListItemSpecsProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function CardListItemSpecs({
  children,
  className,
  ...props
}: CardListItemSpecsProps) {
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      {children}
    </div>
  );
}
