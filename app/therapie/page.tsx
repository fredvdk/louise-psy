import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function TherapiePage() {
    return (
        <>
            <Navbar />
            <div className="h-full flex items-center justify-center mt-10 mb-10">
                <h1 className="text-2xl font-bold">Therapie</h1>
            </div>
            <Footer />
        </>
    );
}
