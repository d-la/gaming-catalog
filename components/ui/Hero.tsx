import { Hero } from "@/types/models/hero";
import { Button } from "./Button";
import Image from "next/image";

type HeroProps = {
    hero: Hero
};

export const HeroSection = ({ hero }: HeroProps) => {

    // Default background svg that will be replaced with the image if the image is passed as a prop
    const backgroundStyle = {
        backgroundImage: `url(topography-micron.svg)`
    };

    return (
        <section className="hero w-full relative min-h-[600px] md:min-h-[500px] flex justify-center items-center" style={backgroundStyle}>
            <div className="hero-overlay bg-black/60 absolute top-0 left-0 right-0 bottom-0 h-full w-full z-2"></div>
            {hero.mobileImageUrl && hero.desktopImageUrl && (
                <picture className="absolute block h-full w-full">
                    <source media="(min-width: 768px)" src={hero.desktopImageUrl} />
                    <Image 
                        src={hero.mobileImageUrl}
                        alt=""
                        fill
                        className="object-cover"
                    ></Image>
                </picture>
            )}
            <div className="hero-content text-left flex flex-col gap-5 justify-start z-3 max-w-7xl mx-auto w-full p-10">
                {hero.title && <h2 className="hero-title font-heading text-3xl md:text-5xl">{ hero.title }</h2>}
                {hero.description && (
                    <div className="hero-description w-full md:max-w-1/2">
                        <p className="font-body text-white">
                            {hero.description}
                        </p>
                    </div>
                )}
                {hero.cta.href && (
                    <div className="hero-cta-container">
                        <Button cta={hero.cta}/>
                    </div>
                )}
            </div>
        </section>
    )
};