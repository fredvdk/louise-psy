import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function AccountPage() {
    return (
        <>
        <Navbar />
        <div className="h-full flex items-center justify-center">
            <h1 className="text-2xl font-bold">Account Page</h1>
        </div>
        <Footer />
        </>
    );
}
