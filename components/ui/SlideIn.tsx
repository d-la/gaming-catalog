"use client";

import { useEffect, useState, ReactNode } from "react";

type SlideInProps = {
    children: ReactNode
    delay?: number
}

export const SlideIn = ({ children, delay = 0 }: SlideInProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const animationId = requestAnimationFrame(() => setIsMounted(true));

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div
            className={`slide-in relative w-full h-full transition-transform duration-300 ease-in-out ${isMounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
            style={{ transitionDelay: `${delay * 120}ms` }}
        >
            {children}
        </div>
    )
}