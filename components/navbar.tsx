import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "./menu";
import  Image  from "next/image";

export function Navbar({showMenu = true}) {
  return (
    <nav className="w-full border-b border-b-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="relative flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
          <h2 className="text-xl font-bold">
            Psycholoog Louise
          </h2>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 justify-center">
          {showMenu && <Menu />}
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