"use client";

import { useState } from "react";
import PaymentButton from "@/components/Payment/PaymentButton";


type ContactSectionProps = {
  lang: "en" | "hi";
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const content = {
    en: {
      title: "Contact Us",
      desc:
        "Need help improving your CIBIL score or fixing your credit report? Contact us today.",
      callText: "Call Now",
      whatsappText: "WhatsApp Chat",
      formName: "Your Name",
      formPhone: "Phone Number",
      formMessage: "Your Message",
      submit: "Submit",
      sending: "Sending...",
      success: "Thanks — we received your message. We will contact you shortly.",
      error: "Something went wrong. Please try again later.",
    },
    hi: {
      title: "संपर्क करें",
      desc:
        "अपना CIBIL Score सुधारने या क्रेडिट रिपोर्ट ठीक कराने में सहायता चाहिए? आज ही संपर्क करें।",
      callText: "अभी कॉल करें",
      whatsappText: "WhatsApp चैट",
      formName: "आपका नाम",
      formPhone: "फ़ोन नंबर",
      formMessage: "आपका संदेश",
      submit: "सबमिट करें",
      sending: "भेजा जा रहा है...",
      success: "धन्यवाद — आपका संदेश मिल गया है। हम शीघ्र संपर्क करेंगे।",
      error: "कुछ गलत हुआ। कृपया बाद में पुनः प्रयास करें।",
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
    <section id="contact" className="w-full py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t.title}
        </h2>
        <p className="text-gray-700">{t.desc}</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* left: compact profile — tighter spacing */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-2">
            <img
              src="/myphoto.jpg"
              alt="CA Anurag Tripathi"
              className="w-24 h-24 rounded-full object-cover shadow-md"     /* was w-28 h-28 */
            />

            <div className="text-center md:text-left">
              <div className="text-lg font-semibold text-gray-900">CA Anurag Tripathi</div>
              <div className="text-sm text-gray-600">Chartered Accountant</div>

              {/* compact vertical stack for CTAs */}
              <div className="mt-2 flex flex-col gap-2">                       {/* replaced mt-3 + mt-4 separate blocks */}
                <a
                  href="tel:+919530064071"
                  className="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                >
                  +91 95300 64071
                </a>

                <a
                  href="https://wa.me/919530064071"
                  className="inline-block bg-green-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm"
                >
                  {t.whatsappText}
                </a>

                {/* Payment CTA for consultations — keep same small spacing */}
                <div className="pt-1">
                  <PaymentButton amount={1499} description="CIBIL consultation fee ₹1499" />
                </div>
              </div>
            </div>
          </div>

        {/* right: form */}
        <div className="md:col-span-2">
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="bg-gray-50 border rounded-lg p-6 flex flex-col gap-4"
          >
            <label className="sr-only" htmlFor="name">{t.formName}</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder={t.formName}
              className="border border-gray-300 p-3 rounded w-full bg-white text-gray-900 placeholder-gray-500"
              required
            />

            <label className="sr-only" htmlFor="phone">{t.formPhone}</label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder={t.formPhone}
              className="border border-gray-300 p-3 rounded w-full bg-white text-gray-900 placeholder-gray-500"
              required
            />

            <label className="sr-only" htmlFor="message">{t.formMessage}</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.formMessage}
              className="border border-gray-300 p-3 rounded w-full h-36 bg-white text-gray-900 placeholder-gray-500"
              required
            />

            <div className="flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
              >
                {loading ? t.sending : t.submit}
              </button>

              <a
                href="tel:+919530064071"
                className="flex-1 text-center bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
              >
                {t.callText}
              </a>
            </div>

            {statusMsg && <div className="text-green-700 mt-2">{statusMsg}</div>}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}