import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Decoration, Title, TwoColumn } from "@/components/pageElements";

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Decoration />
            <TwoColumn>
                <Title text="Hier komt de privacy policy" />
            </TwoColumn>
            <Footer />
        </div>
    )
}