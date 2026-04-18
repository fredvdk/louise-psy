import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function PraktischPage() {
    return (
        <>
            <Navbar />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl lg:text-6xl font-serif text-foreground mb-6 leading-tight">
                                Praktische informatie
                            </h1>
                            <p className="text-xl text-foreground/80 leading-relaxed">
                                Alles wat je moet weten over locatie, tarief, betaling en afspraken.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-serif text-foreground">
                                    Waar vinden we elkaar?
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">In de praktijk</h3>
                                        <p className="text-foreground/70 leading-relaxed">
                                            Louis Leynstraat 1, 8800 Rumbeke
                                        </p>
                                        <p className="text-sm text-foreground/60 mt-3">
                                            De praktijkruimte is rustig en huiselijk ingericht, zonder klinische sfeer. Je vindt me op de eerste verdieping.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">In beweging</h3>
                                        <p className="text-foreground/70 leading-relaxed">
                                            Wandelend door Rumbeke
                                        </p>
                                        <p className="text-sm text-foreground/60 mt-3">
                                            Wanneer gewenst en als de weersomstandigheden het toelaten, kunnen sessies ook al wandelend plaatsvinden.
                                        </p>
                                    </div>

                                    <div className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">Online</h3>
                                        <p className="text-foreground/70 leading-relaxed">
                                            Vanuit thuis
                                        </p>
                                        <p className="text-sm text-foreground/60 mt-3">
                                            Voor mensen met mobiliteitsproblemen of praktische omstandigheden is online therapie mogelijk. De voorkeur gaat uit naar sessies in de praktijk.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="w-full p-8 rounded-lg bg-muted/20 border border-border/40">
                                    <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                        <svg className="w-24 h-24 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-serif text-foreground mb-12">
                                Tarief en duur
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="p-8 rounded-lg bg-primary/5 border border-primary/20">
                                    <div className="text-5xl font-serif text-primary mb-2">€75</div>
                                    <p className="text-foreground/70">per sessie</p>
                                </div>

                                <div className="p-8 rounded-lg bg-primary/5 border border-primary/20">
                                    <div className="text-5xl font-serif text-primary mb-2">50</div>
                                    <p className="text-foreground/70">minuten</p>
                                </div>
                            </div>

                            <p className="text-foreground/70 leading-relaxed">
                                In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Payment Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl space-y-12">
                            <div>
                                <h2 className="text-3xl font-serif text-foreground mb-8">
                                    Betaling
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-foreground/80">Mobiele betaling (Payconiq)</p>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-foreground/80">Cash (geen bancontact)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-serif text-foreground mb-4">
                                    Terugbetaling via mutualiteit
                                </h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    Verschillende mutualiteiten voorzien (gedeeltelijke) terugbetaling voor psychotherapie. Meer informatie kunt u terugvinden op de website van uw mutualiteit zelf.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cancellation Policy Section */}
                <section className="border-b border-border/40">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-serif text-foreground mb-8">
                                Annulatiebeleid
                            </h2>
                            <div className="p-8 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30">
                                <p className="text-foreground leading-relaxed">
                                    In een therapeutisch proces is continuïteit belangrijk. Regelmatige afspraken helpen om het proces op te bouwen en te verdiepen. Wanneer een sessie minder dan 24 uur op voorhand wordt geannuleerd, is het meestal niet meer mogelijk om de gereserveerde tijd nog aan iemand anders aan te bieden. Daarom wordt de sessie in dat geval aangerekend.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-muted/20">
                    <div className="container mx-auto px-6 py-20 lg:py-32">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-serif text-foreground mb-6">
                                Klaar voor je eerste sessie?
                            </h2>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                                Boek nu een afspraak en begin aan je therapeutische reis.
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