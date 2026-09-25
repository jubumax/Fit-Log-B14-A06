import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/shared/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "FitLog",
    template: "FitLog | %s",
  },
  description: "A dark, no-nonsense workout library and fitness planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <Providers>
          <div className="min-h-screen bg-[#0d0e11] text-white">
            <Navbar />

            <main>{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
