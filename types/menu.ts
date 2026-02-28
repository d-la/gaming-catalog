export type MenuLocation = "header" | "footer";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export interface Menu {
  id: string;
  name: string;
  location: MenuLocation;
  menuItems: MenuItem[];
}