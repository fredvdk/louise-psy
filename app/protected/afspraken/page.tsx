import { CalendarSection } from "@/components/calendarsection";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ReservationsList from "@/components/afsprakenlijst";
import { Suspense } from "react";

export default async function ReservationsPage() {

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="m-10">
        <h1 className="text-4xl text-center mb-5">Mijn afspraken</h1>
        <Suspense>
          <ReservationsList />
        </Suspense>
        <div className="w-1/2">
          <h2 className="text-2xl text-center my-5">Free slots</h2>
          <Suspense fallback={<p>Loading calendar...</p>}>
            <CalendarSection />
          </Suspense>
        </div>

      </div>
      <Footer />
    </div>
  );
}
