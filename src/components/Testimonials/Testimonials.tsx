type TestimonialsProps = {
  lang: "en" | "hi";
};

export default function Testimonials({ lang }: TestimonialsProps) {
  const content = {
    en: {
      title: "What Our Clients Say",
      items: [
        {
          text: "My CIBIL score improved from 580 to 720 within 45 days. Highly recommended!",
          name: "Amit Sharma, Delhi",
        },
        {
          text: "They helped fix errors in my report. My loan finally got approved.",
          name: "Neha Gupta, Mumbai",
        },
        {
          text: "Professional and fast service. I understood exactly what was wrong.",
          name: "Rohit Verma, Indore",
        },
      ],
    },

    hi: {
      title: "हमारे ग्राहकों का अनुभव",
      items: [
        {
          text: "मेरा CIBIL Score 580 से 720 हुआ सिर्फ 45 दिनों में। बेहतरीन सेवा!",
          name: "अमित शर्मा, दिल्ली",
        },
        {
          text: "रिपोर्ट में गलतियां हटवाईं और मेरा लोन आखिरकार अप्रूव हो गया।",
          name: "नेहा गुप्ता, मुंबई",
        },
        {
          text: "बहुत ही प्रोफेशनल और तेज़ सेवा। मुझे ठीक से समझाया कि रिपोर्ट में क्या समस्या थी।",
          name: "रोहित वर्मा, इंदौर",
        },
      ],
    },
  };

  const t = content[lang];

  return (
    <section id="testimonials" className="w-full py-20 bg-gray-50 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        {t.title}
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.items.map((item, index) => (
          <div key={index} className="p-6 bg-white border rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">“{item.text}”</p>
            <p className="text-gray-900 font-semibold">— {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
