export type CTAVariants = "primary" | "secondary" | "outline" | "text-only"

export type CTA = {
    href: string,
    label: string,
    external?: boolean,
    ariaLabel?: string,
    variant: CTAVariants
}