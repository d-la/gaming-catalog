"use client";

import { useEffect, useState } from "react";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 300;

            setIsVisible(prev => {
                if (prev === shouldShow) return prev;

                return shouldShow;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const firstSection = document.querySelector('main')?.firstElementChild || document.querySelector('header');

        if (!firstSection) {
            console.error('Unable to scroll to top - main or header element not found');
            return;
        }

        scrollTo({
            top: firstSection.getBoundingClientRect().top,
            behavior: "smooth"
        });
    }

    return (
        <button 
            className={`fixed bottom-20 right-5 xl:bottom-20 xl:right-20 z-100 size-8 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 bg-slate-400 hover:bg-slate-300 focus:bg-slate-300 focus-within:bg-slate-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
            aria-label="Scroll to the top of the page"
            onClick={handleClick}
            title="Scroll to the top of the page"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-slate-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    )
};