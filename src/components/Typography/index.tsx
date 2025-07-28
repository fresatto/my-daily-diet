import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  size?: "h1" | "p";
  className?: string;
} & PropsWithChildren;

export function Typography({
  size = "p",
  children,
  className,
}: PropsWithChildren<TypographyProps>) {
  if (size === "h1") {
    return (
      <h1
        className={cn(
          "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
          className
        )}
      >
        {children}
      </h1>
    );
  }

  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
