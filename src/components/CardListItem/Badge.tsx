import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type CardListItemBadgeProps = {
  children: ReactNode;
} & ComponentProps<typeof Badge>;

export function CardListItemBadge({
  children,
  className,
  ...props
}: CardListItemBadgeProps) {
  return (
    <Badge
      className={cn("text-[10px] rounded-full px-2 py-0.5 h-fit", className)}
      variant="outline"
      {...props}
    >
      {children}
    </Badge>
  );
}
