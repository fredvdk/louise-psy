import { CalendarSection } from "@/components/calendarsection";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ReservationsList from "@/components/reservatielijst";
import { Suspense } from "react";

export default async function ReservationsPage() {

  return (
    <>
      <Navbar />
      <div className="h-full flex flex-row gap-6 m-10">
        <div className="flex-1 flex flex-col justify-start items-start">
          <Suspense fallback={<p>Loading calendar...</p>}>
            <CalendarSection />
          </Suspense>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-2xl font-bold mb-5">Mijn reservaties</h1>
          <Suspense fallback={<p>Loading reservations...</p>}>
            <ReservationsList hasStatus="confirmed" />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
