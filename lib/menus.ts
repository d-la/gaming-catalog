import menusData from "@/data/menus.json";
import { Menu } from "@/types/menu";

const allMenus: Menu[] = menusData.menus as Menu[];

export async function getHeaderMenu(): Promise<Menu | null> {
    const headerMenu = allMenus.find((menu) => menu.location === "header");

    return headerMenu ?? null;
}

export async function getFooterMenus(): Promise<Menu[] | null> {
    return allMenus.filter((menu) => menu.location === "footer");
}