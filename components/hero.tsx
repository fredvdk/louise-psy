import { Button, Container, Paragraph, Title, PageImage } from './pageElements';

const Hero = () => {
    return (
        <section>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content Side */}
                    <Container>
                        <Title text="Met nieuwsgierigheid  naar wat je belemmert" />

                        <Paragraph text="Ik ben Louise, psycholoog en psychotherapeut. In mijn praktijk bied ik een veilige en gedragen ruimte voor (jong)volwassenen. Met milde nieuwsgierigheid onderzoeken we samen de dieperliggende dynamieken die je kunnen belemmeren in relaties, op het werk of binnenin jezelf. Stap voor stap kan er zo opnieuw ruimte ontstaan en beweging komen, op een tempo dat bij jou past. Op deze website lees je meer over wie ik ben en of mijn visie op therapie aansluit bij wat jij zoekt." />

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button link="/protected/reservaties" text="Boek een afspraak" level="primary" />
                            <Button link="/therapie" text="Leer meer over therapie" level="secondary" />
                        </div>
                    </Container>

                    {/* Image Side */}
                    <Container >
                        <PageImage src="/images/hero.jpg" alt="Louise" width={350} height={350} />
                    </Container>
                </div>
        </section>
    );
};

export default Hero;
