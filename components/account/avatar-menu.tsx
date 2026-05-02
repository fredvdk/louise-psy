"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Props = {
    avatarUrl?: string | null;
    email?: string | null;
};

export default function AvatarMenu({ avatarUrl, email }: Props) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const supabase = createClient();

    const logout = async () => {
        await supabase.auth.signOut();
        setOpen(false);
        router.push("/");
        router.refresh(); // ensures server components update
    };

    const goAccount = () => {
        setOpen(false);
        router.push("/protected/account");
    };

    // close menu when clicking outside
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initial = email?.charAt(0).toUpperCase() ?? "?";

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-gray-400 transition"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                        {initial}
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-600 border-b truncate">
                        {email}
                    </div>

                    <button
                        onClick={goAccount}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Accountinstellingen
                    </button>

                    <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                        Afmelden
                    </button>
                </div>
            )}
        </div>
    );
}