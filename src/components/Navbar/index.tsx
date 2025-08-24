"use client";

import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { NavLink } from "../NavLink";
import { cn } from "@/lib/utils";
import { useState } from "react";

type MenuItemsProps = {
  className?: string;
  onLinkClick?: () => void;
};

const MenuItems = ({ className, onLinkClick }: MenuItemsProps) => {
  return (
    <NavigationMenu
      className={cn(
        "max-w-none items-start justify-center md:justify-end",
        className
      )}
      viewport={false}
    >
      <NavigationMenuList className="flex flex-col items-center gap-3 w-full md:flex-row">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink href="/meals" onClick={onLinkClick}>
              Refeições
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink href="/foods" onClick={onLinkClick}>
              Alimentos
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <NavLink href="/daily-goal" onClick={onLinkClick}>
              Objetivo diário
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuItems className="hidden md:flex" />
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger className="md:hidden">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="p-8">
          <DrawerClose>
            <MenuItems onLinkClick={handleLinkClick} />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};
