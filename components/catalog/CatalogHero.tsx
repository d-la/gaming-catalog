import { CatalogHero } from "@/types/catalogHero"
import { StoreIcons } from "../ui/StoreIcons"
import Image from "next/image"
import { SlideIn } from "../ui/SlideIn"
import { joinNames } from "@/utils/joinNames"

type CatalogHeroProps = {
    data: CatalogHero
}

export const CatalogHeroSection = ({ data }: CatalogHeroProps) => {
    const { backgroundImage, title, description, publishers, stores, developers } = data;

    const publisherText = joinNames(publishers);
    const developersText = joinNames(developers);

    return (
        <section className="catalog-hero section-container flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="catalog-hero-image basis-full md:basis-1/2 relative min-h-[300px] md:min-h-auto">
                {backgroundImage && (
                    <Image src={backgroundImage} fill className="object-cover rounded-lg" alt="" />
                )}
            </div>
            <div className="catalog-hero-content basis-full md:basis-1/2 flex flex-col items-start justify-start gap-2.5">
                {title && (
                    <SlideIn delay={2}>
                        <h1 className="">{title}</h1>
                    </SlideIn>)}
                {description && (
                    <SlideIn delay={3}>
                    <div className="">
                        {description}
                    </div>
                    </SlideIn>
                )}
                <SlideIn delay={4}>
                    <StoreIcons stores={stores} />
                </SlideIn>
                <SlideIn delay={5}>
                    <div className="catalog-hero-publishers">
                        <p>
                            PUBLISHER(s): {publisherText}
                        </p>
                    </div>
                </SlideIn>
                <SlideIn delay={6}>
                    <div className="catalog-hero-developers">
                        <p>
                            DEVELOPERS: {developersText}
                        </p>
                    </div>
                </SlideIn>
            </div>
            
        </section>
    )
}