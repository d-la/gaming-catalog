"use client";

import { useEffect } from "react";

export const GlobalScripts = () => {
    useEffect(() => {
        const handleSmoothScrollClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;

            if (target.tagName === "A" && target.hash && target.pathname === window.location.pathname) {
                e.preventDefault();

                const element = document.querySelector(target.hash);
                element?.scrollIntoView({ behavior: "smooth" });
            }
        };

        document.addEventListener("click", handleSmoothScrollClick);
    }, []);

    return null;
}