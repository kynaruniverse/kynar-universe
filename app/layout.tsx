import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import "./globals.css";

// 1. Configure "Outfit" (Primary UI Font)
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// 2. Configure "Lora" (Secondary Body Font)
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
      {/* Apply variables to body */}
      <body className={`${outfit.variable} ${lora.variable} antialiased bg-home-base text-primary-text`}>
        {children}
      </body>
    </html>
  );
}
