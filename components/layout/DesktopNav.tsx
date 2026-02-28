import type { Menu } from "@/types/menu";
import Link from "next/link";

interface DesktopNavProps {
    headerMenu: Menu | null;
    toggleSidebar: () => void;
}

export const DesktopNav = ({ headerMenu, toggleSidebar }: DesktopNavProps) => {
    return (
        <div className="flex flex-row justify-between items-center max-w-7xl mx-auto px-5">
            <div className="header-navbar__logo">
                <Link href="/" className="flex flex-row justify-start items-center basis-40">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="8"  y1="30" x2="18" y2="10" stroke="currentColor" strokeWidth="3" className="stroke-blue-500" />
                        <line x1="14" y1="30" x2="24" y2="10" stroke="currentColor" strokeWidth="3" className="stroke-indigo-500" />
                        <line x1="20" y1="30" x2="30" y2="10" stroke="currentColor" strokeWidth="3" className="stroke-violet-500" />
                    </svg>
                    <h2 className="dark:color-neutral-100 text-2xl">Gaming Store</h2>
                </Link>
            </div>
            <div className="header-navbar__menu">
                <ul className="hidden md:flex flex-row gap-5 items-center justify-end">
                    {headerMenu?.menuItems?.map((item) => (
                        <li key={item.href} className="">
                            <a className="header-navbar__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200" href={item.href} target={item.openInNewTab ? '_blank' : '_self'}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <button type="button" aria-label="Toggle mobile sidebar nav" className="block md:hidden" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
      </div>
    )
}