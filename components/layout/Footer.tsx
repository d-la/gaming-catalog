import Link from "next/link";
import { getFooterMenus } from "@/lib/menus";

export const Footer = async () => {
    const footerMenus = await getFooterMenus();
    const year = new Date().getFullYear();

    return (
        <footer className="footer bg-slate-900 w-full relative py-10 border-t border-solid border-app-border">
            <div className="flex flex-col md:flex-row justify-start items-start max-w-7xl w-full mx-auto p-10 gap-10">
                {footerMenus && footerMenus?.length > 0 && footerMenus?.map(menu => (
                    <div key={menu.id} className="footer-column">
                        <h4 className="footer-column-title pb-2 border-b border-solid border-app-border mb-2">{menu.name}</h4>
                        <ul className="footer-column-menu">
                            {menu.menuItems.length > 0 && menu.menuItems.map((item) => (
                                <li key={item.id}>
                                    <Link className="footer-column-link" href={item.href}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="footer-copyright text-center text-xs text-white">&copy; {year} Gaming Catalog. All rights reserved.</div>
        </footer>
    )
}