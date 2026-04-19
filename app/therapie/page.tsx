import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Bullet, Container, Decoration, PageImage, Paragraph, Title, TwoColumn } from "@/components/pageElements";

export default function TherapiePage() {
    return (
        <div className="w-auto mx-auto">
            <Decoration />
            <Navbar />

            <TwoColumn>
                <Container className="w-3/4">
                    <Title text="Integratieve therapie" />
                    <Paragraph>In mijn praktijk werk ik vanuit de visie van de <span className="font-bold text-primary">Interactionele Vormgeving (I.V.)</span>. Dit is een integratieve vorm van psychotherapie die de mens in zijn geheel probeert te begrijpen. Het vertrekt vanuit het idee dat een mens voortdurend in wisselwerking staat met zijn omgeving, zijn verleden en zichzelf.

                    </Paragraph>
                </Container>

                <Container className="w-1/4">
                    <PageImage src="/images/hero.jpg"
                        alt="therapie"
                        width={350}
                        height={350}
                    />
                </Container>
            </TwoColumn>

            <TwoColumn>
                <Container className="w-1/2">
                    <Title text="Een integratieve blik" level={2} />
                    <Paragraph>Iedere hulpvraag is uniek en vraagt om een eigen benadering. In plaats van vast te houden aan één methodiek, combineer ik inzichten uit verschillende therapeutische stromingen. Dit stelt ons in staat om te kijken naar wat voor jou op dit moment helpend is:
                    </Paragraph>
                </Container>
                <Container className="w-1/2">
                    <div className="flex flex-col">
                        <Bullet name="Patronen uit het verleden" description="Soms ligt het accent op het begrijpen van patronen uit je verleden." />
                        <Bullet name="Lichaamsgericht werk" description="Soms is het nodig om stil te staan bij wat je lichaam vertelt." />
                        <Bullet name="Nieuwe interacties" description="Op andere momenten zoeken we naar nieuwe manieren om met de omgeving of relaties om te gaan." />
                    </div>
                </Container>

            </TwoColumn>

            <TwoColumn>
                <Container>
                    <Title text="Samen vormgeven" level={2} />
                    <Paragraph>Therapie binnen de I.V. is een gezamenlijk proces. We beperken ons niet enkel tot praten; waar zinvol kunnen we ook werken met beeldende elementen, visualisaties of lichaamsgericht werk. Juist die afwisseling helpt om niet alleen met het hoofd te begrijpen, maar ook echt te ervaren waar de ruimte voor verandering ligt.
                    </Paragraph>
                    <Paragraph>
                        In de veilige bedding van de therapeutische relatie onderzoeken we wat er vastloopt en hoe we die interacties weer in beweging kunnen krijgen. Er is hierbij geen vastgelegd pad; we geven de therapie gaandeweg samen vorm, op jouw tempo en aansluitend bij jouw noden.
                    </Paragraph>
                </Container>
            </TwoColumn>

            <Footer />
        </div >
    );
}
