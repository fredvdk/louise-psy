import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function NotFoundPage() {
    return (
        <>
            <Navbar />
            <div className="h-screen flex items-center justify-center flex-col">
                <h1 className="text-2xl mt-4">Sorry, deze pagina bestaat niet.</h1>
            </div>
            <Footer />
        </>
    );
}