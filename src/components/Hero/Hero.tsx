type HeroProps = {
  lang: "en" | "hi";
};

export default function Hero({ lang }: HeroProps) {
  const content = {
    en: {
      title: "Improve Your CIBIL Score Fast",
      subtitle:
        "Get expert guidance to fix your credit report, remove errors, and increase your loan approval chances.",
      callText: "Call Now",
      whatsappText: "WhatsApp Chat",
    },
    hi: {
      title: "अपना CIBIL Score जल्दी सुधारें",
      subtitle:
        "लोन अप्रूवल बढ़ाने के लिए प्रोफेशनल मदद पाएं। रिपोर्ट की गलतियाँ हटवाएं और CIBIL Score तेज़ी से सुधारें।",
      callText: "अभी कॉल करें",
      whatsappText: "WhatsApp चैट",
    },
  };

  const t = content[lang];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-100">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
          {t.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10">{t.subtitle}</p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href="tel:+919530064071"
            className="bg-primary text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg"
          >
            {t.callText}
          </a>

          <a
            href="https://wa.me/919530064071"
            className="bg-secondary text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-secondary-dark transition-transform transform hover:scale-105 shadow-lg"
          >
            {t.whatsappText}
          </a>
        </div>
      </div>
    </section>
  );
}
