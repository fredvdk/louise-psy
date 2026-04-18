import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function TherapiePage() {
    return (
        <>
            <Navbar />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl lg:text-6xl font-serif text-foreground mb-6 leading-tight">
                                Integratieve therapie
                            </h1>
                            <p className="text-xl text-foreground/80 leading-relaxed">
                                Een benadering die je als geheel begrijpt. Together, we explore what holds you back and create new possibilities at your own pace.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif text-foreground mb-6">
                                    De kern van mijn aanpak
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed">
                                    In de Interactionele Vormgeving (I.V.) vertrekte we vanuit het idee dat je voortdurend in wisselwerking staat met je omgeving, je verleden en jezelf. Dit betekent dat we niet vasthouden aan één enkele methodiek, maar kijken naar wat voor jou op dit moment werkelijk helpend is.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integrative View Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="space-y-16">
                            <div>
                                <h2 className="text-3xl font-serif text-foreground mb-8">
                                    Een integratieve blik
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed mb-12">
                                    Iedere hulpvraag is uniek en vraagt om een eigen benadering. In plaats van vast te houden aan één methodiek, combineer ik inzichten uit verschillende therapeutische stromingen. Dit stelt ons in staat om te kijken naar wat voor jou op dit moment helpend is:
                                </p>
                            </div>

                            {/* Approaches Grid */}
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-4 p-8 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">Patronen uit het verleden</h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        Soms ligt het accent op het begrijpen van patronen uit je verleden en hoe die je heden beïnvloeden.
                                    </p>
                                </div>

                                <div className="space-y-4 p-8 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">Lichaamsgericht werk</h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        Soms is het nodig om stil te staan bij wat je lichaam vertelt en hoe lichamelijke sensaties informatie bevatten.
                                    </p>
                                </div>

                                <div className="space-y-4 p-8 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">Nieuwe interacties</h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        Op andere momenten zoeken we naar nieuwe manieren om met je omgeving en relaties om te gaan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Co-creation Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl space-y-8">
                            <h2 className="text-3xl font-serif text-foreground">
                                Samen vormgeven
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                Therapie binnen de Interactionele Vormgeving is een gezamenlijk proces. We beperken ons niet enkel tot praten; waar zinvol kunnen we ook werken met beeldende elementen, visualisaties of lichaamsgericht werk. Die afwisseling helpt om niet alleen met het hoofd te begrijpen, maar ook echt te ervaren waar de ruimte voor verandering ligt.
                            </p>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                In de veilige bedding van de therapeutische relatie onderzoeken we wat er vastloopt en hoe we die interacties weer in beweging kunnen krijgen. Er is hierbij geen vastgelegd pad; we geven de therapie gaandeweg samen vorm, op jouw tempo en aansluitend bij jouw noden.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-muted/20">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-serif text-foreground mb-6">
                                Klaar om te beginnen?
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                                Als je voelt dat deze benadering aansluit bij wat je zoekt, ben ik graag je partner in dit proces. Laten we samen kijken naar wat op dit moment voor jou helpend is.
                            </p>
                            <a
                                href="/protected/reservaties"
                                className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 shadow-lg shadow-primary/20 transition-colors"
                            >
                                Boek een afspraak
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
