import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Psycholoog Louise",
  description: "Welkom bij Psycholoog Louise, waar we streven naar het verbeteren van jouw mentale welzijn. Met jarenlange ervaring en een passie voor het helpen van mensen, biedt Louise professionele psychologische diensten aan die zijn afgestemd op jouw unieke behoeften. Of je nu worstelt met stress, angst, depressie of andere uitdagingen, Louise staat klaar om je te ondersteunen op jouw reis naar een gezonder en gelukkiger leven. Neem vandaag nog contact op en ontdek hoe we samen kunnen werken aan jouw mentale gezondheid.",
};

const lato = Lato({
  variable: "--font-lato",
  display: "swap",
  subsets: ["latin"],
  weight: "400"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background h-screen flex flex-col m-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
