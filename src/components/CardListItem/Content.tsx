import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardListItemContentProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function CardListItemContent({
  children,
  className,
  ...props
}: CardListItemContentProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}
