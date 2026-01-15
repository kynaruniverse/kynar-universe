import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import Navbar from "../components/Navbar"; // IMPORT ADDED
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: "--font-lora", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kynar Universe",
  description: "One Universe. Infinite Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${lora.variable} antialiased bg-home-base text-primary-text`}>
        <Navbar /> {/* COMPONENT ADDED HERE */}
        {children}
      </body>
    </html>
  );
}
