import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Bullet } from "@/components/bullets";
import { Button, Container, Decoration, PageImage, Paragraph, Title } from "@/components/pageElements";

export default function TherapiePage() {
    return (
        <div className="w-auto mx-auto">
            <Decoration />
            <Navbar />

            <div className="flex flex-col lg:flex-row items-center gap-12">
                <Container>
                    <Title text="Integratieve therapie" />
                    <Paragraph text="Een benadering die je als geheel begrijpt. Together, we explore what holds you back and create new possibilities at your own pace." />
                </Container>

                <Container>
                    <Title text="De kern van mijn aanpak" level={2} />
                    <Paragraph text="In de Interactionele Vormgeving (I.V.) vertrekte we vanuit het idee dat je voortdurend in wisselwerking staat met je omgeving, je verleden en jezelf. Dit betekent dat we niet vasthouden aan één enkele methodiek, maar kijken naar wat voor jou op dit moment werkelijk helpend is." />
                </Container>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
                <Container>
                    <Title text="Een integratieve blik" />
                    <Paragraph text="Iedere hulpvraag is uniek en vraagt om een eigen benadering. In plaats van vast te houden aan één methodiek, combineer ik inzichten uit verschillende therapeutische stromingen. Dit stelt ons in staat om te kijken naar wat voor jou op dit moment helpend is:" />

                </Container>
                <Container>
                    <PageImage src="/images/hero.jpg" alt="Image" width={350} height={450} />
                </Container>
                
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <Bullet name="Patronen uit het verleden" description="Soms ligt het accent op het begrijpen van patronen uit je verleden en hoe die je heden beïnvloeden." />
                <Bullet name="Lichaamsgericht werk" description=" Soms is het nodig om stil te staan bij wat je lichaam vertelt en hoe lichamelijke sensaties informatie bevatten." />
                <Bullet name="Nieuwe interacties" description="Op andere momenten zoeken we naar nieuwe manieren om met je omgeving en relaties om te gaan." />
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <Container>
                    <Title text="Samen vormgeven" />
                    <Paragraph text="Therapie binnen de Interactionele Vormgeving is een gezamenlijk proces. We beperken ons niet enkel tot praten; waar zinvol kunnen we ook werken met beeldende elementen, visualisaties of lichaamsgericht werk. Die afwisseling helpt om niet alleen met het hoofd te begrijpen, maar ook echt te ervaren waar de ruimte voor verandering ligt." />
                    <Paragraph text="In de veilige bedding van de therapeutische relatie onderzoeken we wat er vastloopt en hoe we die interacties weer in beweging kunnen krijgen. Er is hierbij geen vastgelegd pad; we geven de therapie gaandeweg samen vorm, op jouw tempo en aansluitend bij jouw noden." />
                </Container>

                {/* CTA Section */}
                <Container>
                    <Title text="Klaar om te beginnen?" level={2} />
                    <Paragraph text="Als je voelt dat deze benadering aansluit bij wat je zoekt, ben ik graag je partner in dit proces. Laten we samen kijken naar wat op dit moment voor jou helpend is." />
                    <Button link="/protected/afspraken" text="Boek een afspraak" level="primary" ></Button>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
