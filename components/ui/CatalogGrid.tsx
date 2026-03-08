import { RawgGame } from "@/types/rawg/game";
import { GameCard } from "./GameCard";
import { SlideIn } from "./SlideIn";

type CatalogGridProps = {
    games: RawgGame[]
};

export default function CatalogGrid({ games }: CatalogGridProps) {

    return (
        <>
            <section className="section-container catalog-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {games.map((game, key) => (
                    <SlideIn key={game.slug} delay={key * 0.1}>
                        <GameCard gameData={game} />
                    </SlideIn>
                ))}
            </section>
        </>
    );
};