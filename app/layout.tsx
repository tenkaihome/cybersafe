import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberSafe | Password strength analyser",
  description: "Handy tools for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/30 text-white`}
      >
        <div className="flex h-screen w-full bg-[#001524] overflow-hidden text-[#c1c2c5] p-4 lg:p-6 gap-6">
          <Sidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#002b47]/50 backdrop-blur-xl border border-[#00416a] rounded-3xl shadow-2xl relative">
            <Header />
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-transparent">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
