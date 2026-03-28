"use client"

import { useState } from "react";
import type { Menu } from "@/types/menu";
import { MobileSidebarNav } from "./MobileSidebarNav";
import { DesktopNav } from "./DesktopNav";
import { useSession } from "next-auth/react";

interface HeaderProps {
  headerMenu: Menu | null;
}

export const Header = ({ headerMenu }: HeaderProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <header className="header-navbar dark:bg-slate-900 py-5 relative border-b border-solid border-app-border">
      <DesktopNav
        headerMenu={headerMenu}
        toggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isLoggedIn={isLoggedIn}
        username={session?.user?.name || null}
      />
      <MobileSidebarNav
        headerMenu={headerMenu}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
      />
    </header>
  )
};
