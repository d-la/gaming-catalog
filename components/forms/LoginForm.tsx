"use client";

import { useState } from "react";
import { GamingStoreIcon } from "../icons/GamingStoreIcon";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === 'login-email') setEmail(value);
        if (id === 'login-password') setPassword(value);
    }

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            setError("Invalid email or password.");
            return;
        }

        router.push(`/account-information`);
    }

    return (
        <section className="bg-slate-900 max-w-150 mx-auto p-5 md:p-10 rounded-lg">
            <div className="form-header pb-5">
                <GamingStoreIcon />
                <h1>Sign In</h1>
            </div>
            {error && (
                <div className="bg-red-600 text-white px-2.5 py-2 w-full rounded-lg mb-5 flex flex-row gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    {error}
                </div>)}
            <form className=" flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email" className="pb-2 block">Email</label>
                    <input id="login-email" type="text" placeholder="your@email.com" value={email} className="border border-app-border border-solid w-full px-2.5 py-2 text-white rounded-lg leading-none bg-gray-950" onChange={onChange} />
                    <span className="text-xs text-white">Use test@test.com to access pages that require authentication</span>
                </div>
                <div className="form-group">
                    <label htmlFor="login-password" className="pb-2 block">Password</label>
                    <input id="login-password" type="password" placeholder="••••••" value={password} className="border border-app-border border-solid w-full px-2.5 py-2 text-white rounded-lg leading-none bg-gray-950" onChange={onChange} />
                    <span className="text-xs text-white">Use <code>password</code> as the password to log in</span>
                </div>
                <button type="submit" className="button-tertiary w-full cursor-pointer">Sign In</button>
            </form>
        </section>
    );
}