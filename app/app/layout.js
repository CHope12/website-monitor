import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Link from "next/link";
import { NavigationMenuApp } from "@/components/app/nav/nav"
import Breadcrumbs from "@/components/Breadcrumbs";
import { MdMonitorHeart } from "react-icons/md"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
      <header>
        <div className="h-20 w-full flex justify-between bg-white">
          <div className="flex h-full items-center pl-8 gap-16 justify-start">
            <Link href="/app/" className="flex gap-2 text-2xl min-[350px]:text-3xl md:text-2xl font-bold items-center"><MdMonitorHeart /><h1>MONITORLY</h1></Link>
              <NavigationMenuApp />
          </div>
        </div>
      </header>
      <Breadcrumbs />
      <main className="p-6 flex justify-center bg-gray-100"> {/* Screen - header - padding */}
        {children}
      </main>
      </body>
    </html>
  );
}