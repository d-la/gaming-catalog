import { RawgGame } from "@/types/rawg/game";
import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
    gameData: RawgGame
}

export const GameCard = ({ gameData }: GameCardProps ) => {
    const { 
        id,
        slug,
        name,
        background_image,
        platforms,
        genres 
    } = gameData;
    return(
        <article className="bg-slate-900 border border-solid border-app-border rounded-lg h-full">
            {background_image && (
                <div className="game-card-image-container aspect-video relative rounded-t-lg">
                    <Image src={background_image} alt="" fill className="object-cover rounded-t-lg"></Image>
                </div>
            )}
            <div className="game-card-content p-5">
                <h3>{name}</h3>
            </div>
        </article>
    );
}