import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { AccountForm } from "@/components/account/account-form";

export default function AccountPage() {
    return (
        <>
        <Navbar />
            <div className="flex items-center justify-center mt-10 mb-10">
            <div className="w-full max-w-md">
                <AccountForm />
            </div>
        </div>
        <Footer />
        </>
    );
}
