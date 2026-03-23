"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

type AccountInformationProps = {
    username: string
};

export const AccountInformationButton = ({ username }: AccountInformationProps) => {

    const [accountOptionsVisible, setAccountOptionsVisible] = useState<boolean>(false);

    // Hide account popup when clicking on something other than popup
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.account-settings') && accountOptionsVisible) {
                setAccountOptionsVisible(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [accountOptionsVisible]);

    const toggleAccountOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAccountOptionsVisible(prev => !prev);
    }

    return (
        <div className="relative">
            <button
                type="button"
                title="Open account options dropdown"
                aria-label="Open account options dropdown"
                className="cursor-pointer rounded-full bg-slate-400 text-slate-900 border border-solid border-app-border size-7 flex justify-center items-center leading-none transition-colors duration-300 hover:bg-slate-300 focus:bg-slate-300 focus-within:bg-slate-300"
                onClick={toggleAccountOptions}
            >
                <span>{username?.charAt(0) || "U"}</span>
            </button>
            <div className={`account-settings absolute top-8 right-0 min-w-fit bg-slate-900 rounded-lg border border-solid border-app-border pt-10 p-5 transition-transform druation-300 ${!accountOptionsVisible ? "-z-1 opacity-0" : "z-10 opacity-100"}`}>
                <button
                    type="button"
                    aria-label="Close account options popup"
                    title="Close account options popup"
                    className="absolute right-2 top-2 cursor-pointer rounded-full bg-slate-400 ml-auto transition-opacity duration-300 hover:opacity-90 focus:opacity-90 focus-within:opacity-90"
                    onClick={() => setAccountOptionsVisible(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 stroke-slate-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <ul className="flex flex-col gap-2.5">
                    <li>
                        <Link
                            href="/account-information"
                            title="Edit your account information"
                            aria-label="Edit your account information"
                            className="flex flex-row gap-2 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            type="button"
                            title="Log out of your account"
                            aria-label="Log out of your account"
                            className="flex flex-row gap-2 cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            <span>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}