import type { Menu } from "@/types/menu";
import Link from "next/link";
import { GamingStoreIcon } from "../icons/GamingStoreIcon";
import { LogInButton } from "../ui/LogInButton";
import { AccountInformationButton } from "../ui/AccountInformationButton";

interface DesktopNavProps {
    headerMenu: Menu | null;
    toggleSidebar: () => void;
    isLoggedIn: boolean,
    username: string | null
}

export const DesktopNav = ({ headerMenu, toggleSidebar, isLoggedIn, username }: DesktopNavProps) => {
    return (
        <div className="flex flex-row justify-between items-center section-container py-0">
            <div className="header-navbar__logo">
                <Link href="/" className="flex flex-row justify-start items-center basis-40">
                    <GamingStoreIcon />
                    <h2 className="dark:color-neutral-100 text-2xl">Gaming Store</h2>
                </Link>
            </div>
            <div className="header-navbar__menu">
                <ul className="hidden md:flex flex-row gap-5 items-center justify-end">
                    {headerMenu?.menuItems?.map((item) => (
                        <li key={item.href} className="">
                            <Link className="header-navbar__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200" href={item.href} target={item.openInNewTab ? '_blank' : '_self'}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    {isLoggedIn && (
                        <li>
                            <Link 
                                href={'/favorites'} 
                                className="header-navbar__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200"
                            >
                                Favorites
                            </Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <LogInButton />

                        </li>
                    )}
                    {isLoggedIn && username && (
                        <li>
                            <AccountInformationButton username={username} />
                        </li>
                    )}
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