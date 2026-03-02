export type MenuLocation = "header" | "footer";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export type Menu = {
  id: string;
  name: string;
  location: MenuLocation;
  menuItems: MenuItem[];
}