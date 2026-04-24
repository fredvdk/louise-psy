import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ReservationsList from "@/components/afsprakenlijst";
import { Suspense } from "react";
import { NieuweAfspraakForm } from "@/components/nieuweAfspraak-form";


export default async function ReservationsPage() {
  return (
    <div className="w-full mx-auto h-screen flex flex-col">
      <Navbar />
      <div className="m-10 flex-1">
        <h1 className="text-4xl text-center mb-5">Mijn afspraken</h1>
        <Suspense fallback={<div className="text-center text-gray-500">Afspraken laden...</div>}>
          <ReservationsList />
          <NieuweAfspraakForm />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
