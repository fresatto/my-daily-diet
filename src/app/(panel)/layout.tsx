import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/components/NavLink";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <NavigationMenu
        className="py-4 max-w-full w-screen border-b border-b-gray-300 grow-0"
        viewport={false}
      >
        <NavigationMenuList className="flex gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
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
      <div className="mx-auto max-w-7xl w-full p-4 flex-1">{children}</div>
    </div>
  );
}
