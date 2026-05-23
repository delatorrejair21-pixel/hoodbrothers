import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Hood Brothers | Commercial Kitchen Hood Cleaning",
  description:
    "Professional commercial kitchen hood cleaning services for restaurants and businesses. Keep your kitchen clean, safe, and inspection-ready.",
  keywords:
    "hood cleaning, kitchen hood cleaning, exhaust hood cleaning, restaurant hood cleaning, grease removal, commercial kitchen cleaning, duct cleaning",
  openGraph: {
    title: "The Hood Brothers | Commercial Kitchen Hood Cleaning",
    description:
      "Professional commercial kitchen hood cleaning services for restaurants and businesses. Keep your kitchen clean, safe, and inspection-ready.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${barlow.variable}`}>
      <body className="min-h-screen bg-[#0D0D0D] text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
