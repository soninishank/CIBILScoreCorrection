import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { CONTACT_PHONE_DISPLAY, WHATSAPP_LINK } from "@/constants";

export const metadata: Metadata = {
    title: "About CA Anurag Tripathi | CIBIL Thik Kare",
    description: "Learn more about CA Anurag Tripathi, a Chatered Accountant providing CIBIL repair and financial consultancy services.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    {/* Left Column: Image & Contact */}
                    <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col items-center text-center relative overflow-hidden">
                        {/* Decorative Circle */}
                        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

                        <div className="relative w-48 h-48 mb-6 z-10">
                            <Image
                                src="/profile.jpg"
                                alt="CA Anurag Tripathi"
                                fill
                                className="rounded-full object-cover border-4 border-white/30 shadow-2xl"
                            />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">CA Anurag Tripathi</h1>
                        <p className="text-blue-100 mb-8 font-medium text-lg bg-white/10 px-4 py-1 rounded-full">Chartered Accountant</p>

                        <div className="w-full space-y-4">
                            <a href={`tel:${CONTACT_PHONE_DISPLAY}`} className="block w-full py-3 bg-white text-primary font-bold rounded-lg shadow-md hover:bg-gray-100 transition">
                                Call Now
                            </a>
                            <a href={WHATSAPP_LINK} className="block w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
                                WhatsApp Me
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Bio & Details */}
                    <div className="md:w-2/3 p-8 md:p-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b-4 border-blue-500 inline-block pb-2">About Me</h2>

                        <div className="mb-8">
                            <p className="text-xl text-gray-700 leading-relaxed font-light mb-6">
                                Hello! I am <strong className="font-bold text-gray-900">CA Anurag Tripathi</strong>, a dedicated Chartered Accountant on a mission to empower individuals and businesses with financial stability and freedom.
                            </p>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-blue-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">10+ Years</h3>
                                        <p className="text-sm text-gray-600">Professional Experience</p>
                                    </div>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start space-x-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">CIBIL Expert</h3>
                                        <p className="text-sm text-gray-600">Score Repair Specialist</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                I specialize in diagnosing complex credit report errors and providing actionable strategies to fix them. My goal is simple: to help you get the loan approvals you deserve, whether it's for your dream home, a new car, or growing your business.
                            </p>
                        </div>

                        {/* Expertise Section */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-blue-600 mr-3 text-sm">✓</span>
                                Areas of Expertise
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "CIBIL Score Improvement",
                                    "Loan Eligibility Analysis",
                                    "Income Tax Planning",
                                    "Credit Report Error Disputes",
                                    "Business Financial Consulting",
                                    "Debt Management"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* QR Code CTA */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
                            <div className="bg-white p-2 rounded-xl shrink-0">
                                <div className="relative w-32 h-32">
                                    <Image
                                        src="/whatsapp-qr.png"
                                        alt="WhatsApp QR Code"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-xl font-bold mb-2 text-white">Let's Discuss Your Case</h3>
                                <p className="text-gray-300 text-sm mb-4">Scan the QR code to chat directly with me on WhatsApp. It's the fastest way to get a response.</p>
                                <a href={`tel:${CONTACT_PHONE_DISPLAY}`} className="inline-block text-white font-semibold border-b border-white/30 hover:border-white pb-1 transition">
                                    Or call: {CONTACT_PHONE_DISPLAY}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
