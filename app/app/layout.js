"use client";

import { useState, useEffect } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Link from "next/link";
import { NavigationMenuApp } from "@/components/app/nav/nav"
import Breadcrumbs from "@/components/Breadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import DataProvider from "./data-provider";


export default function RootLayout({ children }) {

  const [website, setWebsite] = useState(null);

  const handleWebsite = (website) => {
    setWebsite(website);
  }

  const [loading, setLoading] = useState(false);
  const [lighthouseData, setLighthouseData] = useState(null);

  async function runLighthouseTest() {

    if (website === null || website === undefined) {
      return;
    }
    if (website.website === null || website.website === undefined) {
      return;
    }

    setLoading(true);

    const response = await fetch ("/api/lighthouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: website.website })
    })

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      console.log(data);
      setLighthouseData(data);
    }
    else {
      alert("Lighthouse test failed: " + data.error);
    }
  }

  useEffect(() => {
    if (website !== null || website !== undefined){
      console.log(website);
      runLighthouseTest();
    }
  }, [website])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <NavigationMenuApp onWebsiteChange={handleWebsite}/>
      <Breadcrumbs />
      <main className="min-h-[calc(100vh-8rem)] p-6 flex justify-center bg-gray-100"> {/* Screen - header - padding */}
        <DataProvider lighthouseData={lighthouseData} loading={loading} >
        {children}
        </DataProvider>
      </main>
      </body>
    </html>
  );
}