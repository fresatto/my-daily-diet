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
      <header className="border-b border-b-gray-300 grow-0">
        <div className="mx-auto max-w-7xl w-full px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/dashboard">ProteinTracker</Link>
          </h1>
          <NavigationMenu className="py-4 " viewport={false}>
            <NavigationMenuList className="flex gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink href="/foods">Alimentos</NavLink>
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
        </div>
      </header>
      <div className="mx-auto max-w-7xl w-full p-4 flex-1">{children}</div>
    </div>
  );
}
