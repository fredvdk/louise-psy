'use client';

import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
    { name: "Home", href: "/" },
    { name: "Therapie", href: "/therapie" },
    { name: "Praktisch", href: "/praktisch" },
    { name: "Afspraken", href: "/protected/afspraken" },
];

export function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative">
            {/* Desktop menu */}
            <nav className="hidden md:flex">
                <ul className="flex gap-6">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={pathname === item.href ? "font-bold" : ""}
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile button */}
            <button
                onClick={toggleMenu}
                className="md:hidden"
                aria-label="Open menu"
            >
                <MenuIcon />
            </button>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-background border border-gray-300 rounded-md shadow-md p-4 md:hidden">
                    <ul className="flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={pathname === item.href ? "font-bold" : ""}
                            >
                                <Link href={item.href} onClick={closeMenu}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}