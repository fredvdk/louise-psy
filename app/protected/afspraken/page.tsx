import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { NieuweAfspraakForm } from "@/components/afspraken/nieuweAfspraak-form";
import AfsprakenLijstVoorCurrentUser from "@/components/afspraken/afsprakenlijst";
import { AdminPageBtn } from "@/components/AdminPageButton";

export default async function ReservationsPage() {

  return (
    <div className="w-full mx-auto h-screen flex flex-col">
      <Navbar />
      <div className="m-10 flex-1">
        <h1 className="text-4xl text-center mb-5">Mijn afspraken</h1>
        <Suspense fallback={<div className="text-center text-gray-500">Afspraken laden...</div>}>
          <AdminPageBtn />
          <AfsprakenLijstVoorCurrentUser />
          <NieuweAfspraakForm />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
