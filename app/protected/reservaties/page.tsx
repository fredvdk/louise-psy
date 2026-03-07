import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ProtectedPage() {
  return (
    <>
      <Navbar selected="Reservaties"/>
      <div className="h-full flex items-center justify-center">
        Beveiligde pagina, alleen zichtbaar voor ingelogde gebruikers. Voor reservaties;
      </div>
      <Footer />
    </>
  );
}
