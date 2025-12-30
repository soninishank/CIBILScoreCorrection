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
  keywords: [
    "CIBIL", "CIBIL score", "credit repair", "credit report", "loan assistance", "CIBIL सुधार",
    "cibil full form", "free cibil score", "cibil report", "cibil dispute", "paisabazaar cibil",
    "consumer cibil", "cibil score check", "transunion cibil", "CIBIL kaise sudhare",
    "सिबिल स्कोर चेक ऑनलाइन फ्री", "cibil score kaise check kare", "cibil score kaise check kare mobile se",
    "mera cibil score kitna hai", "cibil check karne wala app", "cibil score kaise check kare in hindi",
    "cibil score kaise check hota hai", "आधार कार्ड से सिविल कैसे चेक करें",
    "निःशुल्क CIBIL स्कोर और रिपोर्ट", "फ्री सिबिल स्कोर और रिपोर्ट", "मुफ़्त CIBIL स्कोर और क्रेडिट रिपोर्ट ऑनलाइन देखें",
    "अपने क्रेडिट स्वास्थ्य पर नियंत्रण रखें"
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
    canonical: `${SITE_URL}/hi`,
    languages: {
      "en": `${SITE_URL}/`,
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



export default function HindiHome() {
  return (
    <main>
      <Hero lang="hi" />
      <Services lang="hi" />
      <Testimonials lang="en" />
      <ContactSection lang="en" />
    </main>
  );
}
