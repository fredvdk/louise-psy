import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import UserData from "@/components/userData";
import { Suspense } from "react";

export default function ProtectedPage() {
  return (
    <>
      <Navbar selected="Reservaties"/>
      <div className="h-full flex items-center justify-center">
        <Suspense fallback={<div>Loading user data...</div>}>
          <UserData />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
