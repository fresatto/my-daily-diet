"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<LinkProps>;

export function NavLink({ children, ...props }: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === props.href || pathname.startsWith(props.href as string);

  return (
    <Link
      {...props}
      className={cn("text-sm font-medium", isActive && "underline")}
    >
      {children}
    </Link>
  );
}
