"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

type SlideInProps = {
    children: ReactNode
    delay?: number
}

export const SlideIn = ({ children, delay = 0 }: SlideInProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -50px 0px",
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={`slide-in relative w-full h-full transition-all duration-300 ease-in-out ${!isVisible ? "-translate-y-5 opacity-0" : "translate-y-0 opacity-100"}`}
            style={{ transitionDelay: `${delay * 250}ms` }}
        >
            {children}
        </div>
    )
}