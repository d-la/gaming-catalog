import clsx from "clsx";
import type { Menu } from "@/types/menu";
interface MobileSidebarNavProps {
    headerMenu: Menu | null;
    isOpen: boolean
    onClose: () => void
}

export const MobileSidebarNav = ({ headerMenu, isOpen, onClose }: MobileSidebarNavProps) => {

    return (
        <aside className={`mobile-sidebar-nav absolute block md:hidden dark:bg-slate-900 transition-all duration-300 ease-in-out h-screen top-[81px] min-w-7/10 ${isOpen ? "left-0 z-10" : "-left-full"}`}>
            <div className="mobile-sidebar-header w-full p-5 flex justify-end">
                <button type="button" aria-label="Close sidebar navigation" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <ul className="mobile-sidebar-navigation px-5">
                {headerMenu?.menuItems?.map((item) => (
                    <li key={item.href} className="mb-2.5">
                        <a className="mobile-sidebar-navigation__link transition-all duration-300 hover:color-slate-200 focus:color-slate-200 focus-within:color-slate-200" href={item.href} target={item.openInNewTab ? '_blank' : '_self'}>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};