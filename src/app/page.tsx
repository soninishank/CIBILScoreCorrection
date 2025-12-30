import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactSection from "@/components/ContactSection/ContactSection";
import JsonLd from "@/components/JsonLd/JsonLd";

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CIBIL Thik Kare",
    "url": "https://cibilthikkare.com",
    "logo": "https://cibilthikkare.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9530064071",
      "contactType": "Customer Service"
    }
  };

  return (
    <main>
      <JsonLd data={jsonLdData} />
      <Hero lang="en" />
      <Services lang="en" />
      <Testimonials lang="en" />
      <ContactSection lang="en" />
    </main>
  );
}

