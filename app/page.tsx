import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button, Bullet, Container, Decoration, PageImage, Paragraph, Title, TwoColumn } from "@/components/pageElements";

export default function Home() {
  return (
    <div className="w-auto mx-auto">
      <Navbar />
      <Decoration />

      <TwoColumn>
        <Container>
          <Title text="Met nieuwsgierigheid  naar wat je belemmert" />
          <Paragraph text="Ik ben Louise, psycholoog en psychotherapeut. In mijn praktijk bied ik een veilige en gedragen ruimte voor (jong)volwassenen. Met milde nieuwsgierigheid onderzoeken we samen de dieperliggende dynamieken die je kunnen belemmeren in relaties, op het werk of binnenin jezelf. Stap voor stap kan er zo opnieuw ruimte ontstaan en beweging komen, op een tempo dat bij jou past. Op deze website lees je meer over wie ik ben en of mijn visie op therapie aansluit bij wat jij zoekt." />
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button link="/protected/reservaties" text="Boek een afspraak" level="primary" />
            <Button link="/therapie" text="Leer meer over therapie" level="secondary" />
          </div>
        </Container>

        <Container >
          <PageImage src="/images/hero.jpg" alt="Louise" width={350} height={350} />
        </Container>
      </TwoColumn>

      <hr />

      <TwoColumn>
        <Container>
          <PageImage
            src="/images/Louise_Lilly.jpg"
            alt="Louise"
            width={350}
            height={350}
          />
        </Container>
        <Container>
          <Title text="Over mij" />

          <Paragraph text="Met jarenlange ervaring en expertise help ik cliënten hun mentale gezondheid te verbeteren. Als gediplomeerd psychologe en therapeut bied ik een veilige en ondersteunende omgeving voor persoonlijke groei." />

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
