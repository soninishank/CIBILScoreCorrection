import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactSection from "@/components/ContactSection/ContactSection";

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
