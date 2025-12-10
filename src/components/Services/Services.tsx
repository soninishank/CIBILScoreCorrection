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
    <section id="services" className="w-full py-24 bg-gray-100 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          {t.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((item, index) => (
            <div key={index} className="bg-white p-8 border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
