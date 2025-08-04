import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardListItemContainerProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export function CardListItemContainer({
  children,
  className,
  ...props
}: CardListItemContainerProps) {
  return (
    <div
      className={cn(
        "flex justify-between py-3 px-4 w-full items-center rounded-lg border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
