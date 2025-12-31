import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { GOOGLE_ANALYTICS_ID } from "@/constants";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cibilthikkare.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CIBIL Thik Kare — Improve Your CIBIL Score Fast",
    template: "%s | CIBIL Thik Kare",
  },
  description:
    "Professional CIBIL score repair, credit report correction and loan rejection assistance. Get expert help to fix errors and improve your credit score.",
  keywords: [
    "CIBIL", "CIBIL score", "credit repair", "credit report", "loan assistance", "CIBIL सुधार",
    "cibil full form", "free cibil score", "cibil report", "cibil dispute", "paisabazaar cibil",
    "consumer cibil", "cibil score check", "transunion cibil",
    "cibil score check free online by pan number", "check cibil score free", "sbi cibil score check free",
    "check cibil score by pan card without otp", "paisabazaar cibil score free", "how to check cibil score in gpay",
    "sbi cibil score check online", "how to check cibil score in phonepe"
  ],
  openGraph: {
    title: "CIBIL Thik Kare — Improve Your CIBIL Score Fast",
    description:
      "Professional CIBIL score repair, credit report correction and loan rejection assistance. Get expert help to fix errors and improve your credit score.",
    url: `${SITE_URL}/`,
    siteName: "CIBIL Thik Kare",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "CIBIL Thik Kare — CIBIL score repair",
      },
    ],
    type: "website",
  },
  // canonical + language alternates
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "hi": `${SITE_URL}/hi`,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@CIBILThikKare", // Replace with actual handle if available, or just use site name context
    title: "CIBIL Thik Kare — Improve Your CIBIL Score Fast",
    description: "Professional CIBIL score repair, credit report correction and loan rejection assistance.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    // optional: control crawlers
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative bg-gray-100 text-gray-800 ${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer lang="en" />
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}

