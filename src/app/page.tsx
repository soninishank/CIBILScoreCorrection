import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactSection from "@/components/ContactSection/ContactSection";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


export const metadata: Metadata = {
  title: "CIBIL Thik Kare — Improve Your CIBIL Score Fast",
  description:
    "Professional CIBIL score repair, credit report correction and loan rejection assistance. Get expert help to fix errors and improve your credit score.",
  keywords: ["CIBIL", "CIBIL score", "credit repair", "credit report", "loan assistance", "CIBIL सुधार"],
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


export default function Home() {
  return (
    <main>
      <Hero lang="en" />
       <Services lang="en" />
       <Testimonials lang="en" />
       <ContactSection lang="en" />
    </main>
  );
}
