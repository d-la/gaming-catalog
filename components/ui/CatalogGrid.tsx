import { RawgGame } from "@/types/rawg/game";
import { GameCard } from "./GameCard";
import { SlideIn } from "./SlideIn";

type CatalogGridProps = {
    games: RawgGame[]
};

export default function CatalogGrid({ games }: CatalogGridProps) {

    return (
        <>
            <div className="catalog-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 section-container">
                {games.map((game, key) => (
                    <SlideIn key={game.id} delay={key * 0.1}>
                        <GameCard gameData={game} />
                    </SlideIn>
                ))}
            </div>
        </>
    );
};