import Link from "next/link";
import { CTA } from "@/types/ui";

type ButtonProps = {
    cta: CTA
};

const variantClasses: Record<CTA["variant"], string> = {
    primary: "bg-gray-950 text-white hover:bg-gray-900 focus:bg-gray-900 focus-within:bg-gray-900",
    secondary: "bg-mist-900 text-white hover:bg-mist-700 focus:bg-mist-700 focus-within:bg-mist-700"
}

export const Button = ({ cta }: ButtonProps) => {

    const baseClasses = "inline-block flex items-center justify-center px-5 py-3 rounded-md transition-colors duration-300 ease-in-out font-heading font-bold uppercase"
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