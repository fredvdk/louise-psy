import Credentials from "@/components/credentials";
import { Footer } from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-background mx-auto md:mx-20">
        <Hero />
        <Credentials />
      </main>
      <Footer />
    </>
  );
}
