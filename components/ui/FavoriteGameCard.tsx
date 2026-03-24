import Image from "next/image";
import Link from "next/link";
import type { FavoriteGame } from "@/types/favorite";
import { FavoriteButton } from "./FavoriteButton";

type FavoriteGameCardProps = {
    game: FavoriteGame;
};

export const FavoriteGameCard = ({ game }: FavoriteGameCardProps) => {
    const { slug, name, background_image } = game;

    return (
        <article className="bg-slate-900 border border-solid border-app-border rounded-lg h-full flex flex-col relative">
            {background_image && (
                <div className="game-card-image-container aspect-video relative rounded-t-lg">
                    <Image
                        src={background_image}
                        alt=""
                        width={1000}
                        height={300}
                        className="aspect-video rounded-t-lg"
                        sizes="100vw, (min-width: 768px) 500px"
                    />
                </div>
            )}
            <div className="game-card-content p-5 h-full flex flex-col gap-2.5">
                <div className="flex flex-row justify-start items-center">
                    <FavoriteButton game={game} />
                </div>
                <h3>{name}</h3>
                <Link
                    className="mt-auto button-outline"
                    href={`/catalog/${slug}`}
                    aria-label={`View details for ${name}`}
                >
                    View Game
                </Link>
            </div>
        </article>
    );
};
