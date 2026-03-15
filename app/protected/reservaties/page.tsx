import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ReservationsList from "@/components/reservaties";
import { Suspense } from "react";

export default function ProtectedPage() {
  return (
    <>
      <Navbar />
      <div className="h-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold">Mijn reservaties</h1>
        <Suspense fallback={<p>Loading reservations...</p>}>
          <ReservationsList />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
