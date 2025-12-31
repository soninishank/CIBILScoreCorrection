import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
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
    openGraph: {
        title: "CIBIL Thik Kare — Improve Your CIBIL Score Fast",
        description:
            "Professional CIBIL score repair, credit report correction and loan rejection assistance. Get expert help to fix errors and improve your credit score.",
        url: `${SITE_URL}/hi`,
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
        locale: "hi_IN",
    },
    alternates: {
        canonical: `${SITE_URL}/hi`,
        languages: {
            "en": `${SITE_URL}/`,
        },
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function HindiRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="hi">
            <body className={`relative bg-gray-100 text-gray-800 ${geistSans.variable} ${geistMono.variable}`}>
                <Header />
                <main className="pt-20">
                    {children}
                </main>
                <Footer />
                <GoogleAnalytics gaId="G-PLACEHOLDER" />
            </body>
        </html>
    );
}
