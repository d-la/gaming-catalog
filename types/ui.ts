export type CTAVariants = "primary" | "secondary"

export type CTA = {
    href: string,
    label: string,
    external?: boolean,
    ariaLabel?: string,
    variant: CTAVariants
}