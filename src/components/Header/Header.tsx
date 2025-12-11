"use client"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const isHindi = pathname.startsWith('/hi')
    return (
        <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50">
            {/* Brand Name */}
            <a href={isHindi ? "/hi" : "/"} className="text-2xl font-bold text-primary">
                CIBIL Thik Kare
            </a>
            {/* Menu */}
            <nav className="hidden md:flex gap-8 text-lg text-gray-700 font-medium">
                <a href={isHindi ? "/hi" : "/"} className="hover:text-primary-dark transition-colors">Home</a>
                <a href={isHindi ? "/hi/blog" : "/blog"} className="hover:text-primary-dark transition-colors">Blogs</a>
                <a href={isHindi ? "/hi#services" : "/#services"} className="hover:text-primary-dark transition-colors">Services</a>
                <a href={isHindi ? "/hi#testimonials" : "/#testimonials"} className="hover:text-primary-dark transition-colors">Testimonials</a>
                <a href={isHindi ? "/hi#contact" : "/#contact"} className="hover:text-primary-dark transition-colors">Contact</a>
            </nav>
            <div className="hidden md:flex gap-3 text-gray-900 font-medium relative">
                <LanguageSwitcher />
            </div>
        </header>
    )
}