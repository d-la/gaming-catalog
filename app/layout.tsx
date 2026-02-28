import type { Metadata } from "next";
import { DM_Sans, Ruluko } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { GlobalScripts } from "@/components/GlobalScripts";
import { Footer } from "@/components/layout/Footer";
import { getHeaderMenu } from "@/lib/menus";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
});

const ruluko = Ruluko({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Gaming Store",
  description: "A showcase of games from several different platforms - from the most popular to the newest and most anticipated games and where to purchase them.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerMenu = await getHeaderMenu();

  return (
    <html 
      lang="en"
      className={`${dmSans.variable} ${ruluko.variable} antialiased`}
    >
      <body
        className="relative"
      >
        <GlobalScripts />
        <Header headerMenu={headerMenu} />
        <main className="relative min-h-screen w-full font-sans">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
