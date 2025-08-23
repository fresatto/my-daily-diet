import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";

import "./globals.css";

import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Daily Diet - Dashboard",
  description: "Dashboard do My Daily Diet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col h-screen">
            <header className="border-b border-b-gray-300 grow-0 py-6 md:py-4">
              <div className="mx-auto max-w-7xl w-full px-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  <Link href="/">ProteinTracker</Link>
                </h1>
                <Navbar />
              </div>
            </header>
            <div className="mx-auto max-w-7xl w-full p-4 flex-1">
              {children}
            </div>
          </div>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
