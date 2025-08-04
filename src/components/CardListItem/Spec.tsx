import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardListItemSpecProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function CardListItemSpec({
  children,
  className,
  ...props
}: CardListItemSpecProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
}
