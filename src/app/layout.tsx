import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClubSportFrance - Trouvez votre club sportif en France",
  description: "Map interactive de tous les clubs sportifs de France. Trouvez facilement un club pres de chez vous : football, tennis, basketball, natation et plus.",
  keywords: "club sportif, sport, France, carte interactive, football, tennis, basketball, natation",
  authors: [{ name: "ClubSportFrance" }],
  openGraph: {
    title: "ClubSportFrance",
    description: "Trouvez votre club sportif en France",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
