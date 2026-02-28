import { GameData } from "@/types/models/gameData";
import { GamingPlatformIcons } from "./GamingPlatformIcons";
import Image from "next/image";

type FeaturedGameCardProps = {
    game: GameData
};

export const FeaturedGameCard = ({ game }: FeaturedGameCardProps) => {
    const Wrapper: React.ElementType = game.storeUrl ? "a" : "div";


    return (
        <Wrapper
            {...(game.storeUrl && {
                href: game.storeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": `View ${game.title} on the store page.`,
                tabIndex: 0
            })}
            className="featured-game-card rounded-lg bg-slate-600 flex flex-col items-start justify-start h-full"
        >
            {game.mobileImage && game.desktopImage && <div className="basis-full w-full relative">
                <picture className="relative block aspect-2/3 md:aspect-92/43">
                    <source media="(min-width: 768px)" srcSet={game.desktopImage} />
                    <Image 
                        src={game.mobileImage}
                        alt={`${game.title} coverart image`}
                        fill
                        className="object-cover rounded-t-lg"
                    ></Image>
                </picture>
            </div>}
            <div className="featured-game-card__game-info basis-full md:basis-auto p-5 md:p-10 rounded-b-lg">
                {game.platform && (
                    <div className="featured-game-card__platforms flex flex-row gap-1.5 items-center justify-start pb-2.5">
                        <GamingPlatformIcons platform={game.platform}></GamingPlatformIcons>
                    </div>
                )}
                {game.category.length > 0 && (
                    <div className="featured-game-card__tags flex flex-row gap-1.5 items-center justify-start pb-2.5">
                        {game.category.map((category, index) => (
                            <span 
                                key={index} 
                                className="featured-game-card__tag px-2.5 py-1 bg-gray-800 text-taupe-50 text-xs"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                )}
                {game.title && <h2 className="featured-game-card__title text-slate-200 text-left text-2xl md:text-3xl pb-2.5">{game.title}</h2>}
                {game.description && <p className="featured-game-card__description pb-2.5">{game.description}</p>}
                {game.price && <span className="featured-game-card__price text-slate-200 text-xs">${game.price}</span>}
            </div>
        </Wrapper>
    );
};