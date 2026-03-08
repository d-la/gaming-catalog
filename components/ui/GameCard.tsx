import { RawgGame } from "@/types/rawg/game";
import Image from "next/image";
import Link from "next/link";
import { StoreIcons } from "@/components/ui/StoreIcons";

type GameCardProps = {
    gameData: RawgGame
}

export const GameCard = ({ gameData }: GameCardProps ) => {
    const {
        slug,
        name,
        background_image,
        stores,
    } = gameData;
    return(
        <article className="bg-slate-900 border border-solid border-app-border rounded-lg h-full flex flex-col">
            {background_image && (
                <div className="game-card-image-container aspect-video relative rounded-t-lg">
                    <Image src={background_image} alt="" fill className="object-cover rounded-t-lg"></Image>
                </div>
            )}
            <div className="game-card-content p-5 h-full flex flex-col gap-2.5">
                <StoreIcons stores={stores} />
                <h3>{name}</h3>
                <Link className="mt-auto button-outline" href={`/catalog/${slug}`} aria-label={`View details for ${name}`}>
                    View Game
                </Link>
            </div>
        </article>
    );
}