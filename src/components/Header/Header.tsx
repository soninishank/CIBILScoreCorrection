"use client"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const isHindi = pathname.startsWith('/hi')
    return (
        <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Brand Name */}
            <a href={isHindi ? "/hi" : "/"} className="text-xl font-bold text-gray-900">
                CIBIL Thik Kare
            </a>
            {/* Menu */}
            <div className="hidden md:flex gap-6 text-gray-700 font-medium">
                <a href={isHindi ? "/hi" : "/"} className="hover:text-blue-600">Home</a>
                <a href={isHindi ? "/hi/blog" : "/blog"} className="hover:text-blue-600">Blogs</a>
                <a href="/#services" className="hover:text-blue-600">Services</a>
                <a href="/#testimonials" className="hover:text-blue-600">Testimonials</a>
                <a href="/#contact" className="hover:text-blue-600">Contact</a>
            </div>
            <div className="hidden md:flex gap-3 text-gray-900 font-medium relative">
                <LanguageSwitcher />
            </div>
        </nav>
    )
}