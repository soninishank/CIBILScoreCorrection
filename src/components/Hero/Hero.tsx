import { CONTACT_PHONE_DISPLAY, WHATSAPP_LINK } from "@/constants";
import Link from "next/link";

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
      checkScoreText: "Check Free CIBIL Score",
    },
    hi: {
      title: "अपना CIBIL Score जल्दी सुधारें",
      subtitle:
        "लोन अप्रूवल बढ़ाने के लिए प्रोफेशनल मदद पाएं। रिपोर्ट की गलतियाँ हटवाएं और CIBIL Score तेज़ी से सुधारें।",
      callText: "अभी कॉल करें",
      whatsappText: "WhatsApp चैट",
      checkScoreText: "मुफ्त CIBIL Score चेक करें",
    },
  };

  const t = content[lang];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[20%] w-[40%] h-[40%] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl z-10 relative">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-semibold text-sm mb-6 shadow-sm border border-blue-100">
          ✨ Trusted by 1000+ Happy Clients
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-sm">
          {t.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center flex-wrap items-center">
          <a
            href={`tel:${CONTACT_PHONE_DISPLAY}`}
            className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/30 flex items-center gap-2"
          >
            {t.callText}
          </a>

          <a
            href={WHATSAPP_LINK}
            className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
          >
            {t.whatsappText}
          </a>

          <Link
            href="/blog/check-cibil-score-india"
            className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
          >
            {t.checkScoreText}
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
            ))}
          </div>
          <p className="font-medium">Join 500+ people who improved their score this month</p>
        </div>
      </div>
    </section>
  );
}
