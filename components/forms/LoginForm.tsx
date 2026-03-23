"use client";

import { useState } from "react";
import { GamingStoreIcon } from "../icons/GamingStoreIcon";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { validateEmail, validatePassword } from "@/lib/formValidations";

export const LoginForm = () => {
    const [error, setError] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const [touched, setTouched] = useState<{
        email?: boolean;
        password?: boolean;
    }>({
        email: false,
        password: false,
    });
    const [form, setForm] = useState({ email: "", password: "" });
    const validators = {
        email: validateEmail,
        password: validatePassword
    } as const;

    const router = useRouter();

    type FieldName = keyof typeof validators;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement & { name: FieldName };
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement & { name: FieldName };
        setTouched((prev) => ({ ...prev, [name]: true }));
        setFieldErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setIsSubmitted(true);

        // Simulate an API call to show loading state
        await new Promise((res) => setTimeout(res, 1000));

        const { email, password } = form;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password.");
            setIsSubmitted(false);
            return;
        }

        setError("");
        setIsSubmitted(false);

        router.push(`/account-information`);
    };

    return (
        <section className="bg-slate-900 max-w-150 mx-auto p-5 md:p-10 rounded-lg">
            <div className="form-header pb-5">
                <GamingStoreIcon />
                <h1>Sign In</h1>
            </div>
            {error && (
                <div className="bg-red-600 text-white px-2.5 py-2 w-full rounded-lg mb-5 flex flex-row gap-2.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                    {error}
                </div>
            )}
            <form className=" flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email" className="pb-2 block">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="text"
                        placeholder="your@email.com"
                        value={form.email}
                        className={`border border-solid w-full px-2.5 py-2 text-white rounded-lg leading-none bg-gray-950 transition-colors duration-300 ${fieldErrors.email ? "border-red-500" : "border-app-border"}`}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="email"
                        required
                    />
                    {fieldErrors.email && touched.email && (
                        <span className="text-xs text-red-500">
                            {fieldErrors.email}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="login-password" className="pb-2 block">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        placeholder="••••••"
                        value={form.password}
                        className={`border border-solid w-full px-2.5 py-2 text-white rounded-lg leading-none bg-gray-950 transition-colors duration-300 ${fieldErrors.password ? "border-red-500" : "border-app-border"}`}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="password"
                        required
                    />
                    {fieldErrors.password && touched.password && (
                        <span className="text-xs text-red-500">
                            {fieldErrors.password}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className={`button-tertiary w-full cursor-pointer flex flex-row gap-2.5 justify-center ${isSubmitted ? "opacity-50" : ""}`}
                    disabled={isSubmitted}
                    aria-disabled={isSubmitted}
                >
                    {isSubmitted && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 animate-spin [animation-duration:2s]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    )}
                    <span>Sign In</span>
                </button>
            </form>
            <p className="text-xs text-white mt-5">Use the following credentials to log in:<br />email: <code>test@test.com</code><br />password: <code>password</code></p>
        </section>
    );
};
