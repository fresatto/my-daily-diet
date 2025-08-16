import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const CardContainer: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-6 bg-white rounded-lg border border-gray-200",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
