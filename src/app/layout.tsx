import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import React from "react";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
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
    "सिबिल स्कोर चेक ऑनलाइन फ्री", "cibil score kaise check kare", "cibil score kaise check kare mobile se",
    "mera cibil score kitna hai", "cibil check karne wala app", "cibil score kaise check kare in hindi",
    "cibil score kaise check hota hai", "आधार कार्ड से सिविल कैसे चेक करें"
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
      <body className="relative bg-gray-100 text-gray-800">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

