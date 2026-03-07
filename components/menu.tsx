'use client';
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

const menuItems = [
    { name: "Over Mij", href: "/" },
    { name: "Therapie", href: "/" },
    { name: "Tarieven", href: "/" },
    { name: "Contact", href: "/" },
    { name: "Reservaties", href: "/protected/reservaties" },
];

export function Menu({ selected }: { selected: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selected);

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
                    {menuItems.map((item) => (
                        <li key={item.name}
                            className={selectedItem === item.name ? "font-bold" : ""}
                            onClick={() => setSelectedItem(item.name)}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <MenuIcon className="md:hidden" onClick={toggleMenu} />

            {menuOpen && (
                <div className="absolute top-16 right-4 bg-background border border-gray-300 rounded-md p-4">
                    <ul className="flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <li key={item.name} className="font-bold">
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>)
}