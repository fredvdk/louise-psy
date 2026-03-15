import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "./menu";

export function Navbar() {
  return (
    <nav className="w-full border-b border-b-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="relative flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold font-serif tracking-tight hover:opacity-80 transition-opacity"
        >
          Louise Psy
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 justify-center">
          <Menu />
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Suspense fallback={<div className="w-20 h-8" />}>
            <AuthButton />
          </Suspense>

          <ThemeSwitcher />

          {/* Mobile menu */}
          <div className="md:hidden">
            <Menu />
          </div>
        </div>

      </div>
    </nav>
  );
}