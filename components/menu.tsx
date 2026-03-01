'use client';
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

function menuItems() {
    return [
        { name: "Over Mij", href: "/" },
        { name: "Therapie", href: "/" },
        { name: "Tarieven", href: "/" },
        { name: "Contact", href: "/" },
        { name: "Reservaties", href: "/protected/reservaties" },
    ];
}

export function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="">
            <div className="hidden md:flex">
                <ul className="flex gap-6">
                    {menuItems().map((item) => (
                        <li key={item.name}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <MenuIcon className="md:hidden" onClick={toggleMenu} />

            {menuOpen && (
                <div className="absolute top-16 right-4 bg-background border border-gray-300 rounded-md p-4">
                    <ul className="flex flex-col gap-4">
                        {menuItems().map((item) => (
                            <li key={item.name}>
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>)
}