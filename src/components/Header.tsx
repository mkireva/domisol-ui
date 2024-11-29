"use client";
import Link from "next/link";
import {
  ChevronRightIcon,
  MenuIcon,
  UsersRound,
  ListMusic,
} from "lucide-react";
import { NavButton } from "./NavButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => setMenuOpen(false);
  return (
    <header className="animate-slide fixed top-0 left-0 right-0 z-50 w-full border-b bg-[#f5f5f5] dark:bg-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-1">
            <NavButton href="/" label="Home" icon={ListMusic} />
          </div>
          <nav className="flex items-center gap-1">
            <div className="hidden sm:flex">
              <Link
                href="/sheets"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  "hover:bg-[hsl(var(--primary-hover))] hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                title="Sheets"
              >
                <span>Sheets</span>
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <NavButton href="/users" label="Users" icon={UsersRound} />
              <div className="w-px h-4 bg-border mx-1 hidden sm:block" />
              <ThemeToggle />

              <div className="block sm:hidden">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-9 h-9 hover:bg-[hsl(var(--primary-hover))] hover:text-primary"
                      onClick={handleMenuToggle}
                    >
                      <MenuIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild onSelect={handleMenuClose}>
                      <Link
                        href="/"
                        className="flex w-full items-center justify-between py-2 text-sm"
                        prefetch={false}
                      >
                        Home
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild onSelect={handleMenuClose}>
                      <Link
                        href="/sheets"
                        className="flex w-full items-center justify-between py-2 text-sm"
                        prefetch={false}
                      >
                        Sheets
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild onSelect={handleMenuClose}>
                      <Link
                        href="/users"
                        className="flex w-full items-center justify-between py-2 text-sm"
                        prefetch={false}
                      >
                        Users
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
