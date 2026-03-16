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
        <Suspense>
          <ReservationsList hasStatus="confirmed" />
        </Suspense>
        <div className="flex-1 justify-start items-start">
          <Suspense fallback={<p>Loading calendar...</p>}>
            <CalendarSection />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
