"use client";

import { useState } from "react";
import PaymentButton from "@/components/Payment/PaymentButton";

import Image from "next/image";
import { CONTACT_PHONE_DISPLAY, WHATSAPP_LINK } from "@/constants";

type ContactSectionProps = {
  lang: "en" | "hi";
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const content = {
    en: {
      title: "Get in Touch",
      desc:
        "Have questions about your CIBIL score? Fill out the form below and we'll get back to you shortly.",
      callText: "Call Now",
      whatsappText: "WhatsApp Chat",
      formName: "Your Name",
      formPhone: "Phone Number",
      formMessage: "Your Message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Thanks for your message! We'll be in touch soon.",
      error: "Something went wrong. Please try again.",
    },
    hi: {
      title: "संपर्क करें",
      desc:
        "CIBIL स्कोर के बारे में कोई प्रश्न है? नीचे दिया गया फ़ॉर्म भरें और हम जल्द ही आपसे संपर्क करेंगे।",
      callText: "अभी कॉल करें",
      whatsappText: "WhatsApp चैट",
      formName: "आपका नाम",
      formPhone: "फ़ोन नंबर",
      formMessage: "आपका संदेश",
      submit: "संदेश भेजें",
      sending: "भेजा जा रहा है...",
      success: "आपके संदेश के लिए धन्यवाद! हम जल्द ही संपर्क में रहेंगे।",
      error: "कुछ गलत हुआ। कृपया दोबारा कोशिश करें।",
    },
  };

  const t = content[lang];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);
    setError(null);

    // --- Honeypot (bot trap) ---
    const hp = (document.getElementById("hp_field") as HTMLInputElement | null)?.value;
    if (hp && hp.trim() !== "") {
      // silent ignore (pretend success) so bots don't learn
      setStatusMsg(t.success);
      setName("");
      setPhone("");
      setMessage("");
      return;
    }

    // --- Basic client validation ---
    const nameTrim = name.trim();
    const phoneTrim = phone.trim().replace(/\s+/g, "");
    const msgTrim = message.trim();

    if (nameTrim.length < 2 || nameTrim.length > 100) {
      setError(lang === "en" ? "Please enter a valid name (2-100 characters)." : "कृपया 2-100 अक्षरों का वैध नाम दर्ज करें।");
      return;
    }

    // Indian phone number regex: supports +91, 91 or 10-digit starting 6-9
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneTrim)) {
      setError(lang === "en" ? "Please enter a valid Indian phone number." : "कृपया वैध भारतीय फ़ोन नंबर दर्ज करें।");
      return;
    }

    if (msgTrim.length < 10 || msgTrim.length > 2000) {
      setError(lang === "en" ? "Message is too short (min 10 characters)." : "संदेश बहुत छोटा है (न्यूनतम 10 अक्षर)।");
      return;
    }

    // Prepare payload (include honeypot for server optional check)
    const payload = {
      name: nameTrim,
      phone: phoneTrim,
      message: msgTrim,
      language: lang,
      source: window.location.href,
      hp: hp || ""
    };

    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Network response not ok");
      }

      setStatusMsg(t.success);
      setName("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("submit error:", err);
      if (err.name === "AbortError") {
        setError(lang === "en" ? "Request timed out. Try again." : " अनुरोध का समय समाप्त हो गया। पुनः प्रयास करें।");
      } else {
        setError(t.error);
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <section id="contact" className="w-full py-24 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {t.title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{t.desc}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch relative z-10">
        {/* left: compact profile — enhanced */}
        <div className="flex flex-col items-center text-center bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl border border-blue-100 shadow-xl">
          <div className="relative w-40 h-40 mb-6">
            <Image
              src="/profile.jpg"
              alt="CA Anurag Tripathi"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white"
            />
          </div>

          <div className="text-center w-full">
            <div className="text-3xl font-bold text-gray-900 mb-1">CA Anurag Tripathi</div>
            <div className="text-lg text-primary font-medium mb-8 bg-blue-100/50 inline-block px-4 py-1 rounded-full">Chartered Accountant</div>

            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
              <a
                href={`tel:${CONTACT_PHONE_DISPLAY}`}
                className="flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
              >
                <span>📞</span> {CONTACT_PHONE_DISPLAY}
              </a>

              <a
                href={WHATSAPP_LINK}
                className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
              >
                {t.whatsappText}
              </a>

              <div className="pt-4 border-t border-gray-100 mt-2">
                <PaymentButton amount={1499} description="CIBIL consultation fee ₹1499" />
              </div>
            </div>
          </div>
        </div>

        {/* right: form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="sr-only" htmlFor="name">{t.formName}</label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder={t.formName}
                className="border border-gray-200 p-4 rounded-xl w-full bg-gray-50 text-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">{t.formPhone}</label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder={t.formPhone}
                className="border border-gray-200 p-4 rounded-xl w-full bg-gray-50 text-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="message">{t.formMessage}</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.formMessage}
                className="border border-gray-200 p-4 rounded-xl w-full h-40 bg-gray-50 text-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? t.sending : t.submit}
            </button>

            {statusMsg && <div className="p-3 rounded-lg bg-green-50 text-green-700 mt-2 text-center font-medium border border-green-100">{statusMsg}</div>}
            {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 mt-2 text-center font-medium border border-red-100">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}