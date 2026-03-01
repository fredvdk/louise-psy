import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "./menu";

export function Navbar() {

  return (
    <nav className="w-full border-b border-b-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Louise Psy
        </Link>
        <Menu />
        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="w-20 h-8" />}>
            <AuthButton />
            <ThemeSwitcher />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}