import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeneVeda Biosciences — Advancing Bioscience Research, Innovation & Global Careers",
  description:
    "GeneVeda Biosciences is a multidisciplinary biotech organization offering R&D services, bioinformatics analysis, NGS, diagnostics, training programs, and global study abroad guidance in life sciences.",
  keywords: [
    "biosciences",
    "biotechnology",
    "bioinformatics",
    "NGS",
    "next-generation sequencing",
    "study abroad",
    "life sciences",
    "research",
    "training programs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
