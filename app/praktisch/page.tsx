import { Footer } from "@/components/footer";
import ImageSlider from "@/components/imagesSlider/imageSlider";
import { Navbar } from "@/components/navbar";
import { Bullet, Container, Decoration, Paragraph, TwoColumn } from "@/components/pageElements";
import Link from "next/link";
import { Suspense } from "react";

export default function PraktischPage() {
    return (
        <div className="w-full mx-auto">
            <Navbar />
            <Decoration />

            <TwoColumn>
                <Container className="md:w-1/3">
                    <Suspense>
                        <ImageSlider images={['/images/praktijk_1.jpg', "/images/praktijk_2.jpg", "/images/praktijk_3.jpg",
                            "/images/praktijk_4.jpg", "/images/praktijk_5.jpg", "/images/praktijk_6.jpg"]
                        } />
                    </Suspense>

                </Container>

                <Container className="md:w-3/4">
                    <Bullet name="In de praktijk" description="Louis Leynstraat 1, 8800 Rumbeke. De praktijkruimte is rustig en huiselijk ingericht, zonder klinische sfeer. Je vindt me op de eerste verdieping." />
                    <Bullet name="In beweging" description="Wanneer gewenst en als de weersomstandigheden het toelaten, kunnen sessies ook al wandelend plaatsvinden.Wandelend door Rumbeke" />
                    <Bullet name="Online" description="Voor mensen met mobiliteitsproblemen of praktische omstandigheden is online therapie mogelijk. De voorkeur gaat uit naar sessies in de praktijk." />
                </Container>
            </TwoColumn>

            <TwoColumn>
                <Container className="md:w-1/3">
                    <Paragraph> In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen.</Paragraph>
                    <div className="w-full p-8 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-3xl font-serif text-primary mb-2 text-center">€75</div>
                        <p className="text-foreground/70 text-center">per sessie van 50 minuten</p>
                    </div>
                </Container>
                <Container className="md:w-1/3">
                    <Bullet name="Betaling met GSM" description="QR-code of Bancontact Pay" />
                    <Bullet name="Cash" description="" />
                    <Bullet name="Terugbetaling via mutualiteit" description="Verschillende mutualiteiten voorzien (gedeeltelijke) terugbetaling voor psychotherapie. Meer informatie kunt u terugvinden op de website van uw mutualiteit zelf." />
                </Container>
                <Container className="md:w-1/3">
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
                        <p className="text-foreground leading-relaxed">
                            In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen. Wanneer een sessie minder dan 24 uur op voorhand wordt geannuleerd, is het meestal niet meer mogelijk om de gereserveerde tijd nog aan iemand anders aan te bieden. Daarom wordt de sessie in dat geval aangerekend.
                        </p>
                    </div>
                </Container>
            </TwoColumn>

            <hr />
            <TwoColumn>
                <Container className="md:w-1/2">
                    <Paragraph>
                        U kunt mij altijd contacteren per mail, telefoon of online via dit <Link href="/protected/afspraken" className="text-blue-700">aanmeldformulier</Link>. Verder werk ik enkel op afspraak, het adres van mijn praktijk is Louis Leynstraat 1, 8800 Rumbeke.
                    </Paragraph>
                </Container>
                <Container className="md:w-1/2">
                    <div className="w-full flex justify-center items-center py-8">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.43705902052!2d3.1468993157489673!3d50.93412977954501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c336646d7cf1a5%3A0xb2cbc5ba75906c49!2sLouis%20Leynstraat%201%2C%208800%20Roeselare!5e0!3m2!1sen!2sbe!4v1659549508107!5m2!1sen!2sbe"
                            title="Google Maps - Practice Location"
                            width="300"
                            height="200"
                            loading="lazy"
                            allowFullScreen={true}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </Container>
            </TwoColumn>


            <Footer />
        </div>);
}
