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
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          {t.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8">{t.subtitle}</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="tel:+91XXXXXXXXXX"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            {t.callText}
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            {t.whatsappText}
          </a>
        </div>
      </div>
    </section>
  );
}
