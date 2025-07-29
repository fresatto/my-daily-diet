import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  size?: "h1" | "h2" | "p";
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
          "scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance",
          className
        )}
      >
        {children}
      </h1>
    );
  }

  if (size === "h2") {
    return (
      <h2
        className={cn(
          "scroll-m-20 text-xl font-bold tracking-tight",
          className
        )}
      >
        {children}
      </h2>
    );
  }

  return <p className="leading-none">{children}</p>;
}
