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
          desc: "<ul><li>Personalized guidance to <a href='/blog/5-easy-ways-improve-cibil' class='text-primary hover:underline'>improve cibil score</a></li><li>Quickly and safely improve your credit health</li></ul>",
        },
        {
          title: "Taxation Services",
          desc: "<ul><li>Income tax planning and optimization</li><li>Filing of ITR (individual & corporate)</li><li>GST registration, filing, and compliance</li><li>TDS/TCS return filing</li><li>Representation during tax audits and assessments</li></ul>",
        },
        {
          title: "Accounting & Bookkeeping",
          desc: "<ul><li>Complete bookkeeping and ledger management</li><li>Preparation of P&L accounts and balance sheets</li><li>Payroll accounting and Form 16 help</li></ul>",
        },
        {
          title: "Audit & Assurance",
          desc: "<ul><li>Statutory, internal, and compliance audits</li><li>Due diligence audits for mergers or investments</li></ul>",
        },
        {
          title: "Loan & Funding Support",
          desc: "<ul><li>Support for Retail, Business, and Home Loans</li><li>Preparation of project reports and CMA data</li><li>Fix <a href='/blog/why-cibil-score-dropped' class='text-primary hover:underline'>loan rejection due to cibil</a></li></ul>",
        },
        {
          title: "Business Registration & Compliance",
          desc: "<ul><li>Company/LLP/Partnership registration</li><li>ROC filings and annual compliance</li><li>GST registration and business onboarding</li></ul>",
        },
      ],
    },

    hi: {
      title: "हमारी सेवाएं",
      items: [
        {
          title: "CIBIL Score सुधार",
          desc: "<ul><li>आपकी प्रोफ़ाइल के अनुसार स्कोर बढ़ाने का मार्गदर्शन</li><li>जल्दी और सुरक्षित तरीके से क्रेडिट स्वास्थ्य में सुधार</li></ul>",
        },
        {
          title: "कराधान सेवाएं (Taxation Services)",
          desc: "<ul><li>आयकर योजना और अनुकूलन</li><li>ITR दाखिल करना (व्यक्तिगत और कॉर्पोरेट)</li><li>GST पंजीकरण, फाइलिंग और अनुपालन</li><li>TDS/TCS रिटर्न फाइलिंग</li><li>कर ऑडिट और मूल्यांकन के दौरान प्रतिनिधित्व</li></ul>",
        },
        {
          title: "लेखा और बहीखाता (Accounting & Bookkeeping)",
          desc: "<ul><li>पूर्ण बहीखाता और खाता बही प्रबंधन</li><li>P&L खाते और बैलेंस शीट तैयार करना</li><li>पेरोल लेखा और फॉर्म 16 सहायता</li></ul>",
        },
        {
          title: "ऑडिट और आश्वासन (Audit & Assurance)",
          desc: "<ul><li>वैधानिक, आंतरिक, और अनुपालन ऑडिट</li><li>विलय या निवेश के लिए उचित परिश्रम ऑडिट</li></ul>",
        },
        {
          title: "ऋण और धन सहायता (Loan & Funding Support)",
          desc: "<ul><li>रिटेल, बिजनेस और होम लोन के लिए सहायता</li><li>परियोजना रिपोर्ट, CMA डेटा तैयार करना</li><li>ऋण पात्रता में सुधार के लिए वित्तीय अनुपात विश्लेषण</li></ul>",
        },
        {
          title: "व्यापार पंजीकरण और अनुपालन",
          desc: "<ul><li>कंपनी/एलएलपी/साझेदारी पंजीकरण</li><li>आरओसी फाइलिंग और वार्षिक अनुपालन</li><li>जीएसटी पंजीकरण और व्यापार ऑनबोर्डिंग</li></ul>",
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

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="h-2 w-12 bg-primary rounded-full mb-6 group-hover:w-20 transition-all duration-300"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="text-gray-600 text-lg blog-content leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
