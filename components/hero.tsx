import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="bg-background mx-20">
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
                <div className="h-96 w-96 rounded-full bg-primary"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <span className="inline-block px-4 py-1.5 mb-2 text-sm font-medium tracking-wide text-primary uppercase bg-primary/10 rounded-full">
                            Veilig • Ondersteunend • Vertrouwelijk
                        </span>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
                            Jouw weg naar <span className="italic text-primary">innerlijke rust</span> begint hier.
                        </h1>

                        <p className="text-lg md:text-xl text-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Soms gebeurt het dat we de weg kwijt geraken of het gevoel hebben vast komen te zitten. Op zo’n momenten kan psychologische ondersteuning nodig of wenselijk zijn.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/reservaties"
                                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                Boek een afspraak
                            </Link>
                            <Link
                                href="/about"
                                className="px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary/20 shadow-lg shadow-primary/20"
                            >
                                Leer meer over therapie
                            </Link>
                        </div>

                        <p className="text-sm text-slate-400 italic">
                            Currently accepting new clients for in-person and telehealth sessions.
                        </p>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            {/* Using a placeholder - swap for a high-quality photo of your office or yourself */}
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 m-6">
                                <Image
                                    src="/images/hero.jpg"
                                    alt="Therapist's Office"
                                    className="w-full h-full object-cover"
                                    width={600}
                                    height={750}
                                />
                            </div>
                            {/* Floating Credential Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Licensed Specialist</p>
                                        <p className="text-sm text-slate-500">10+ Years Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
