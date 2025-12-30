"use client";
import React from "react";
import { Users, CheckCircle, TrendingUp, Award } from "lucide-react";

type StatsProps = {
    lang: "en" | "hi";
};

export default function Stats({ lang }: StatsProps) {
    const content = {
        en: [
            {
                icon: Users,
                value: "1000+",
                label: "Happy Clients",
                desc: "Trusted by individuals & businesses",
            },
            {
                icon: CheckCircle,
                value: "98%",
                label: "Success Rate",
                desc: "In resolving CIBIL disputes",
            },
            {
                icon: TrendingUp,
                value: "₹50Cr+",
                label: "Loans Approved",
                desc: "Facilitated through our guidance",
            },
            {
                icon: Award,
                value: "10+",
                label: "Years Experience",
                desc: "Expert financial consultancy",
            },
        ],
        hi: [
            {
                icon: Users,
                value: "1000+",
                label: "संतुष्ट ग्राहक",
                desc: "व्यक्तियों और व्यवसायों द्वारा भरोसा किया गया",
            },
            {
                icon: CheckCircle,
                value: "98%",
                label: "सफलता दर",
                desc: "CIBIL विवादों को सुलझाने में",
            },
            {
                icon: TrendingUp,
                value: "₹50Cr+",
                label: "लोन स्वीकृत",
                desc: "हमारे मार्गदर्शन के माध्यम से",
            },
            {
                icon: Award,
                value: "10+",
                label: "वर्षों का अनुभव",
                desc: "विशेषज्ञ वित्तीय परामर्श",
            },
        ],
    };

    const stats = content[lang];

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 text-primary">
                                <stat.icon size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</h3>
                            <p className="text-lg font-bold text-gray-800 mb-1">{stat.label}</p>
                            <p className="text-sm text-gray-500">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
