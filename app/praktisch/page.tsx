import { Bullet } from "@/components/bullets";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button, Container, Decoration, Paragraph, Title } from "@/components/pageElements";

export default function PraktischPage() {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Decoration />
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <Container>
                    <Title text="Praktische informatie" />
                    <Paragraph text="Alles wat je moet weten over locatie, tarief, betaling en afspraken." />
                </Container>

                <Container>
                    <Title text="Waar vinden we elkaar?" level={2} />
                    <Bullet name="In de praktijk" description="Louis Leynstraat 1, 8800 Rumbeke" />
                    <Bullet name="Ruimte" description="De praktijkruimte is rustig en huiselijk ingericht, zonder klinische sfeer. Je vindt me op de eerste verdieping." />
                    <Bullet name="In beweging" description="Wanneer gewenst en als de weersomstandigheden het toelaten, kunnen sessies ook al wandelend plaatsvinden.Wandelend door Rumbeke" />
                    <Bullet name="Online" description="Voor mensen met mobiliteitsproblemen of praktische omstandigheden is online therapie mogelijk. De voorkeur gaat uit naar sessies in de praktijk." />
                </Container>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">

                <Container>
                    <Title text="Tarief en duur" level={2} />
                    <Paragraph text=" In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen." />
                    <div className="lg:w-1/3 md:w-1/2 p-8 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-5xl font-serif text-primary mb-2">€75</div>
                        <p className="text-foreground/70">per sessie van 50 minuten</p>
                    </div>
                </Container>
                <Container>
                    <Button link="/protected/afspraken" text="Boek een afspraak" level="primary" />
                </Container>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
                <Container>
                    <Title text="Betaling" />
                    <Bullet name="Mobiele betaling" description="Alleen Payconiq" />
                    <Bullet name="Cash" description="Geen bancontact" />
                    <Bullet name="Terugbetaling via mutualiteit" description="Verschillende mutualiteiten voorzien (gedeeltelijke) terugbetaling voor psychotherapie. Meer informatie kunt u terugvinden op de website van uw mutualiteit zelf." />
                </Container>

                <Container>
                    <Title text="Annulatiebeleid" level={2} />
                    <div className="p-8 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
                        <p className="text-foreground leading-relaxed">
                            In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen. Wanneer een sessie minder dan 24 uur op voorhand wordt geannuleerd, is het meestal niet meer mogelijk om de gereserveerde tijd nog aan iemand anders aan te bieden. Daarom wordt de sessie in dat geval aangerekend.
                        </p>
                    </div>
                </Container>
            </div>





            <Footer />
        </div>);
}
