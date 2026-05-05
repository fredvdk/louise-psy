import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { CookieConsent } from "@/components/cookieConsent";
import { Toaster } from "sonner"; //
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Psycholoog Louise",
  description: "Welkom bij Psycholoog Louise...",
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
          <CookieConsent />
          
          {/* 
              Toaster setup to meet requirements:
              - Position: top-right
              - richColors: handles success (green), error (red), etc.
              - closeButton: allows manual dismiss
              - duration: auto-dismiss after 5 seconds
          */}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            duration={5000} 
          />
        </ThemeProvider>
      </body>
    </html>
  );
}