import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Container, Decoration, Paragraph, Title, TwoColumn } from "@/components/pageElements";

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Decoration />

            
            <TwoColumn>
                <Container className="md:w-1/2" >
                    <Title text="Privacy policy" />
                    <Paragraph>
                        Persoonsgegevens worden verwerkt door Louise Van de Kerckhove, te bereiken via louise.psycholoog@gmail.com. Volgende persoonsgegevens worden verwerkt: voor- en achternaam, adresgegevens, telefoonnummer, e-mailadres, hulpvragen en andere afspraakgegevens.
                    </Paragraph>
                    <Paragraph>
                        Onze website heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via louise.psycholoog@gmail.com, dan verwijderen wij deze informatie.
                    </Paragraph>
                    <Paragraph>
                        Uw persoonsgegevens worden niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Uw persoonsgegevens worden uitsluitend aan derden verstrekt als dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. De website gebruikt cookies om login gegevens te onthouden.
                    </Paragraph>
                </Container>
                <Container className="md:w-1/2">
                    <Paragraph>
                        U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens en heeft u het recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een verzoek kunt indienen om de persoonsgegevens die wij van u beschikken in een computerbestand naar u of een ander, door u genoemde organisatie, te sturen. U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar info@psycholooglouise.be. Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs met het verzoek mee te sturen. Maak in deze kopie uw pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van uw privacy. We reageren zo snel mogelijk, maar binnen vier weken, op uw verzoek. psycholoog.be wil u er tevens op wijzen dat u de mogelijkheid heeft om een klacht in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via de volgende link: https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons
                    </Paragraph>
                    <Paragraph>
                        De bescherming van uw gegevens wordt serieus genomen en we nemen passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met louise.psycholoog@gmail.com
                    </Paragraph>
                </Container>
            </TwoColumn>
            <Footer />
        </div>
    )
}