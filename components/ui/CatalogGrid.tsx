"use client"

import { useState } from "react";
import { RawgGame } from "@/types/rawg/game";
// import { useSearchParams, useRouter } from "next/navigation";
import AnimatedWrapper from "./AnimatedWrapper";
import { GameCard } from "./GameCard";

type CatalogGridProps = {
    games: RawgGame[]
};

export default function CatalogGrid({ games }: CatalogGridProps) {
    const [filteredGames, setFilteredGames] = useState(games);
    // const searchParams = useSearchParams();
    // const router = useRouter();

    // const platformFilter = searchParams.get("platform") || ""; 

    // let updatedGames = [...games];

    // if (platformFilter) {
    //     updatedGames = updatedGames.filter((game) => game.platforms.some((p) => p.platform.slug === platformFilter));
    //     setFilteredGames(updatedGames);

    // }

    return (
        <>
            <div className="catalog-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 section-container">
                {filteredGames.map((game) => (
                    <AnimatedWrapper key={game.id}>
                        <GameCard gameData={game} />
                    </AnimatedWrapper>
                ))}
            </div>
        </>
    );
};