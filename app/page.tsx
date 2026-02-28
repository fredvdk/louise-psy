import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex border-b border-b-foreground/10 h-16">
          <ThemeSwitcher />
        </nav>
        <main className="flex-1 flex flex-col gap-6 px-4">
        </main>
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          Hier komt de footer
        </footer>
      </div>
    </main>
  );
}
