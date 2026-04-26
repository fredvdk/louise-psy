import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Bullet, Container, Decoration, PageImage, Paragraph, Title, TwoColumn } from "@/components/pageElements";

export default function OverMij() {
    return (
        <div className="w-auto mx-auto">
            <Navbar />
            <Decoration />

            <TwoColumn>
                <Container className="md:w-1/4">
                    <PageImage
                        src="/images/Louise_Lilly.jpg"
                        alt="Louise"
                    />
                </Container>
                <Container className="md:w-3/4">
                    <Title text="Over mij" />

                    <Paragraph>Met jarenlange ervaring en expertise help ik cliënten hun mentale gezondheid te verbeteren. Als gediplomeerd psychologe en therapeut bied ik een veilige en ondersteunende omgeving voor persoonlijke groei.</Paragraph>

                    <div className="flex flex-col gap-8">
                        <Bullet name="Psychotherapeut" description="Mijn basisopleiding volgde ik aan de Universiteit Gent, waar ik in 2020 afstudeerde als klinisch psycholoog. In de jaren daarna deed ik mijn eerste ervaringen op in verschillende groepspraktijken en volgde ik een vierjarige psychotherapieopleiding in de Interactionele Vormgeving (I.V.) in Berchem (2021-2025). Zowel deze procesgerichte opleiding als de ontmoetingen met cliënten gaven mijn werk verder vorm." />

                        <Bullet name="Ervaring" description="Naast mijn praktijk werk ik halftijds in het PPC Pittem, waar ik mensen begeleid met onder meer complex trauma, hechtings- en persoonlijkheidsproblematieken. De combinatie van ambulant en residentieel werken houdt mijn klinische blik scherp en helpt me verbonden te blijven met het geestelijke gezondheidszorglandschap." />

                        <Bullet name="Waarden" description="Authenticiteit, nieuwsgierigheid en openheid zijn waarden die ik zowel professioneel als persoonlijk koester. Die nieuwsgierigheid klinkt door in mijn liefde voor reizen, waar ik telkens opnieuw ervaar hoe verrijkend het is om met een onbevangen blik het onbekende tegemoet te gaan. Thuis word ik vergezeld door mijn speelse teckel Lilly, die me dagelijks herinnert aan de waarde van eenvoudige aanwezigheid." />
                    </div>
                </Container>
            </TwoColumn>

            <Footer />
        </div>
    );
}
