export default function Footer({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
    const isHindi = lang === 'hi';
    return (
        <footer className="w-full bg-gray-900 text-gray-400 py-12 px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div>
                    <p className="text-lg font-bold text-white">CIBIL Thik Kare</p>
                    <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <a href={isHindi ? "/hi#about" : "/#about"} className="hover:text-white transition-colors">About Us</a>
                    <a href="#" className="hover:text-white transition-colors">Facebook</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}