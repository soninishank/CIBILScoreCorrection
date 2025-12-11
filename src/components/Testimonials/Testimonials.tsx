"use client";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

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
        {
          text: "Their loan support service is exceptional. They guided me through the entire process and I secured funding for my startup.",
          name: "Priya Patel, Bangalore",
        },
        {
          text: "I was struggling to get a home loan due to a low CIBIL score. They not only improved my score but also helped me with the loan application.",
          name: "Rajesh Kumar, Chennai",
        },
        {
          text: "The best place for anyone looking for financial guidance. They have a deep understanding of loan markets and CIBIL-related issues.",
          name: "Anjali Singh, Pune",
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
        {
          text: "इनकी लोन सपोर्ट सर्विस असाधारण है। उन्होंने मुझे पूरी प्रक्रिया में मार्गदर्शन किया और मैंने अपने स्टार्टअप के लिए फंडिंग हासिल की।",
          name: "प्रिया पटेल, बैंगलोर",
        },
        {
          text: "कम CIBIL स्कोर के कारण मुझे होम लोन लेने में परेशानी हो रही थी। उन्होंने न केवल मेरा स्कोर सुधारा बल्कि लोन आवेदन में भी मेरी मदद की।",
          name: "राजेश कुमार, चेन्नई",
        },
        {
          text: "वित्तीय मार्गदर्शन की तलाश करने वाले किसी भी व्यक्ति के लिए सबसे अच्छी जगह। उन्हें लोन बाजार और CIBIL से संबंधित मुद्दों की गहरी समझ है।",
          name: "अंजलि सिंह, पुणे",
        },
      ],
    },
  };

  const t = content[lang];
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const scrollAmount = scrollContainer.current.offsetWidth;
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimonials" className="w-full py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t.title}
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainer}
          className="flex overflow-x-auto snap-x snap-mandatory space-x-8"
        >
          {t.items.map((item, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-full md:w-1/3 bg-white p-8 border border-gray-200 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6">“{item.text}”</p>
              <p className="text-md text-gray-800 font-semibold text-right">
                — {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
