import Link from "next/link";

export function Footer() {
    return (
        <footer className="flex border-t border-gray-300 text-xs p-3">
            <div className="flex-1">
                <p className="">
                    Louise Van de Kerckhove <br />
                    ☎ 0468 14 00 01 <br />
                    Louis Leynstraat 1, 8800 Rumbeke    <br />
                    ✉ info@psycholooglouise.be
                </p>
            </div>
            <div className="hidden md:block flex-1 mx-auto text-center">
                &copy; 2026 Louise Psy. All rights reserved.
            </div>
            <div className="flex-1 text-right">
                <Link href="/privacy-policy" className="underline">
                    Privacy Policy
                </Link>
            </div>
        </footer>
    )
}