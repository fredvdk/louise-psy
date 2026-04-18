import { Bullet } from "./bullets";
import { Container, PageImage, Paragraph, Title } from "./pageElements";

function Credentials() {
    return (
        <section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Image Section */}
                <Container>
                    <PageImage
                        src="/images/Louise_Lilly.jpg"
                        alt="Louise"
                        width={350}
                        height={350}
                    />
                </Container>


                {/* Content Section */}
                <Container>
                    <Title text="Over mij" />

                    <Paragraph text="Met jarenlange ervaring en expertise help ik cliënten hun mentale gezondheid te verbeteren. Als gediplomeerd psychologe en therapeut bied ik een veilige en ondersteunende omgeving voor persoonlijke groei." />

                    <div className="flex flex-col gap-8">
                        <Bullet name="Psychotherapeut" description="Mijn basisopleiding volgde ik aan de Universiteit Gent, waar ik in 2020 afstudeerde als klinisch psycholoog. In de jaren daarna deed ik mijn eerste ervaringen op in verschillende groepspraktijken en volgde ik een vierjarige psychotherapieopleiding in de Interactionele Vormgeving (I.V.) in Berchem (2021-2025). Zowel deze procesgerichte opleiding als de ontmoetingen met cliënten gaven mijn werk verder vorm." />

                        <Bullet name="Ervaring" description="Naast mijn praktijk werk ik halftijds in het PPC Pittem, waar ik mensen begeleid met onder meer complex trauma, hechtings- en persoonlijkheidsproblematieken. De combinatie van ambulant en residentieel werken houdt mijn klinische blik scherp en helpt me verbonden te blijven met het geestelijke gezondheidszorglandschap." />

                        <Bullet name="Waarden" description="Authenticiteit, nieuwsgierigheid en openheid zijn waarden die ik zowel professioneel als persoonlijk koester. Die nieuwsgierigheid klinkt door in mijn liefde voor reizen, waar ik telkens opnieuw ervaar hoe verrijkend het is om met een onbevangen blik het onbekende tegemoet te gaan. Thuis word ik vergezeld door mijn speelse teckel Lilly, die me dagelijks herinnert aan de waarde van eenvoudige aanwezigheid." />
                    </div>
                </Container>
            </div>
        </section>
    );
}

export default Credentials;