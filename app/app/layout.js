import "../globals.css";
import { auth0 } from "@/lib/auth0";
import App from "@/components/App";
import Login from "@/components/Login"
import { redirect } from "next/navigation";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {

  const session = await auth0.getSession();

  if (!session){
    redirect('/auth/login');    
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <App>
        {children}
      </App>
      </body>
    </html>
  );
}