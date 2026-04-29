import { Footer } from "@/components/footer";
import MessageList from "@/components/messages/messageList";
import { Navbar } from "@/components/navbar";
import { Button, Container, Decoration, PageImage, Paragraph, Title, TwoColumn } from "@/components/pageElements";
import { Suspense } from "react";

export default function Home() {

  return (
    <div className="w-full mx-auto">
      <Navbar />
      <Suspense fallback={<div className="p-4 text-center text-gray-500">Berichten laden...</div>}>
        <MessageList />
      </Suspense>

      <Decoration />

      <TwoColumn>
        <Container className="md:w-3/4">
          <Title text="Welkom" />
          <Paragraph>
            Ik ben Louise, <span className="font-bold text-primary">psycholoog en psychotherapeut</span>. In mijn praktijk bied ik een veilige en gedragen ruimte voor <span className="font-bold text-primary">(jong)volwassenen</span>. Met milde nieuwsgierigheid onderzoeken we samen de dieperliggende dynamieken die je kunnen belemmeren in relaties, op het werk of binnenin jezelf. Stap voor stap kan er zo opnieuw ruimte ontstaan en beweging komen, op een tempo dat bij jou past. Op deze website lees je meer over wie ik ben en of mijn visie op therapie aansluit bij wat jij zoekt.
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button link="/protected/afspraken" text="Boek een afspraak" level="primary" />
          </div>
        </Container>

        <Container className="md:w-1/4 flex flex-col justify-center">
          <PageImage src="/images/hero.jpg" alt="Louise" />
        </Container>
      </TwoColumn>

      <Footer />
    </div>
  );
}
