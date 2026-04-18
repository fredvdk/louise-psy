import Credentials from "@/components/credentials";
import { Footer } from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Decoration } from "@/components/pageElements";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main className="bg-background">
        <Decoration />
        <Hero />
        <hr />
        <Credentials />
      </main>
      <Footer />
    </div>
  );
}
