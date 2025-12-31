import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactSection from "@/components/ContactSection/ContactSection";
import JsonLd from "@/components/JsonLd/JsonLd";
import { CONTACT_PHONE_DISPLAY } from "@/constants";

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CIBIL Thik Kare",
    "url": "https://cibilthikkare.in",
    "logo": "https://cibilthikkare.in/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_PHONE_DISPLAY,
      "contactType": "Customer Service"
    }
  };
  return (
    <main>
      <JsonLd data={jsonLdData} />
      <Hero lang="en" />
      <Stats lang="en" />
      <Services lang="en" />
      <Testimonials lang="en" />
      <ContactSection lang="en" />
    </main>
  );
}

