import { CatalogHero } from "@/types/catalogHero"
import { StoreIcons } from "../ui/StoreIcons"
import Image from "next/image"
import { SlideIn } from "../ui/SlideIn"

type CatalogHeroProps = {
    data: CatalogHero
}

export const CatalogHeroSection = ({ data }: CatalogHeroProps) => {
    const { backgroundImage, title, description, publishers, stores, developers } = data;

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
                        <p className="[&_span]:mr-2">
                            <span className="mr-2">PUBLISHER(s):</span>
                            {publishers.length > 0 && publishers.map((publisher) => (
                                <span key={publisher.id}>{publisher.name}</span>
                            ))}
                        </p>
                    </div>
                </SlideIn>
                <SlideIn delay={6}>
                    <div className="catalog-hero-developers">
                        <p>
                        <span className="mr-2">DEVELOPERS:</span>
                            {developers.length > 0 && developers.map((developer) => (
                                <span key={developer.id}>{developer.name}</span>
                            ))}
                        </p>
                    </div>
                </SlideIn>
            </div>
            
        </section>
    )
}