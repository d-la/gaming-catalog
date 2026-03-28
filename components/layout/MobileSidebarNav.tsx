"use client";

import type { Menu } from "@/types/menu";
import { useEffect } from "react";
import Link from "next/link";

interface MobileSidebarNavProps {
    headerMenu: Menu | null;
    isOpen: boolean;
    closeSidebar: () => void;
    isLoggedIn: boolean;
}

export const MobileSidebarNav = ({
    headerMenu,
    isOpen,
    closeSidebar,
    isLoggedIn,
}: MobileSidebarNavProps) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target;

            if (!(target instanceof Element)) {
                return;
            }

            if (
                !target.closest(".mobile-sidebar-nav") &&
                isOpen
            ) {
                closeSidebar();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [isOpen, closeSidebar]);

    return (
        <aside
            className={`mobile-sidebar-nav absolute block md:hidden dark:bg-slate-900 transition-all duration-300 ease-in-out h-screen top-[81px] min-w-7/10 ${isOpen ? "left-0 z-10" : "-left-full -z-1"}`}
        >
            <div className="mobile-sidebar-header w-full p-5 flex justify-end">
                <button
                    type="button"
                    aria-label="Close sidebar navigation"
                    onClick={closeSidebar}
                    className="sidebar-toggle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <ul className="mobile-sidebar-navigation px-5">
                {headerMenu?.menuItems?.map((item) => (
                    <li key={item.href} className="mb-2.5">
                        <Link
                            className="mobile-sidebar-navigation__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200"
                            href={item.href}
                            target={item.openInNewTab ? "_blank" : "_self"}
                            onClick={closeSidebar}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                {isLoggedIn && (
                    <li>
                        <Link
                            href={"/favorites"}
                            className="header-navbar__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200"
                            onClick={closeSidebar}
                        >
                            Favorites
                        </Link>
                    </li>
                )}
            </ul>
        </aside>
    );
};
