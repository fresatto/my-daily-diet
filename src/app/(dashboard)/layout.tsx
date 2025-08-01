import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <NavigationMenu
        className="py-4 max-w-full w-screen border-b border-b-gray-300"
        viewport={false}
      >
        <NavigationMenuList className="flex gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/foods">Alimentos cadastrados</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/meals">Refeições</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/daily-goal">Objetivo diário</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="mx-auto max-w-7xl w-full px-4">{children}</div>
    </div>
  );
}
