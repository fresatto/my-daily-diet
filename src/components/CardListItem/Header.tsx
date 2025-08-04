import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardListItemHeaderProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function CardListItemHeader({
  children,
  className,
  ...props
}: CardListItemHeaderProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}
