import { Suspense } from "react";
import { GamingStoreIcon } from "@/components/icons/GamingStoreIcon";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <section className="login-page section-container">
            <Suspense>
                <LoginForm />
            </Suspense>
        </section>
    );
}