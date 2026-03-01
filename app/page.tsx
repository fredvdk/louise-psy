import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />
        <main className="flex-1 flex flex-col gap-6 px-4">
          This is public content;
        </main>
        <Footer />
      </div>
    </main>
  );
}
