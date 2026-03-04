import Link from "next/link";
import { CTA } from "@/types/ui";

type ButtonProps = {
    cta: CTA
};

const variantClasses: Record<CTA["variant"], string> = {
    primary: "button-primary",
    secondary: "button-secondary",
    outline: "button-outline",
    "text-only": "button-text-only"
}

export const Button = ({ cta }: ButtonProps) => {

    const baseClasses = "inline-block flex items-center justify-center px-5 py-3"
    const classes = `${baseClasses} ${variantClasses[cta.variant]}`;

    if (cta.external) {
        return (
            <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={cta.ariaLabel ?? `Go to ${cta.label}`}
                className={classes}
            >
                {cta.label}
            </a>
        )
    }

    return (
        <Link
            href={cta.href}
            aria-label={cta.ariaLabel ?? cta.label}
            className={classes}
        >
            {cta.label}    
        </Link>
    );
};