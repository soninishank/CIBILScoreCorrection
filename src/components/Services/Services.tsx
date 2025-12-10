type ServicesProps = {
  lang: "en" | "hi";
};

export default function Services({ lang }: ServicesProps) {
  const content = {
    en: {
      title: "Our Services",
      items: [
        {
          title: "CIBIL Score Improvement",
          desc: "Personalized guidance to increase your score quickly and safely.",
        },
        {
          title: "Credit Report Analysis",
          desc: "Identify problems in your report and fix them professionally.",
        },
        {
          title: "Loan Rejection Assistance",
          desc: "Understand why your loan was rejected and get a clear solution.",
        },
        {
          title: "Dispute & Error Removal",
          desc: "Remove incorrect entries like DPD, settled status, written-off, etc.",
        },
      ],
    },

    hi: {
      title: "हमारी सेवाएं",
      items: [
        {
          title: "CIBIL Score सुधार",
          desc: "आपकी प्रोफ़ाइल के अनुसार स्कोर जल्दी और सुरक्षित तरीके से बढ़ाने का मार्गदर्शन।",
        },
        {
          title: "क्रेडिट रिपोर्ट विश्लेषण",
          desc: "रिपोर्ट में मौजूद समस्याओं की पहचान और उन्हें प्रोफ़ेशनली ठीक करवाना।",
        },
        {
          title: "लोन रिजेक्शन सहायता",
          desc: "जानें कि लोन क्यों रिजेक्ट हुआ और उसका समाधान प्राप्त करें।",
        },
        {
          title: "विवाद एवं त्रुटि सुधार",
          desc: "ग़लत एंट्री जैसे DPD, Settled, Written-off आदि को हटवाएं।",
        },
      ],
    },
  };

  const t = content[lang];

  return (
    <section id="services" className="w-full py-20 bg-white px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        {t.title}
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {t.items.map((item, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
