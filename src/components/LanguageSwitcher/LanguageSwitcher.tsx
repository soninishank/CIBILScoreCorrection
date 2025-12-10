"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const isHindi = pathname.startsWith('/hi');
    
    const getEnglishUrl = () => {
        if (!isHindi) return pathname;
        return pathname.replace('/hi', '') || '/';
    }

    const getHindiUrl = () => {
        if (isHindi) return pathname;
        if (pathname === '/') return '/hi';
        return `/hi${pathname}`;
    }

    return (
        <div className="relative" ref={ref}>
            <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer flex items-center gap-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{isHindi ? 'हिंदी' : 'EN'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <a href={getEnglishUrl()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">EN</a>
                    <a href={getHindiUrl()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">हिंदी</a>
                </div>
            )}
        </div>
    );
}