import { CalendarSection } from "@/components/calendarsection";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ReservationsList from "@/components/reservatielijst";
import { Suspense } from "react";

export default async function ReservationsPage() {

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="m-10">
        <h1 className="text-4xl text-center mb-5">Mijn afspraken</h1>
        <Suspense>
          <ReservationsList  />
        </Suspense>
        <h1 className="text-4xl text-center my-5">Nieuwe afspraak maken</h1>
        <Suspense fallback={<p>Loading calendar...</p>}>
          <CalendarSection />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
