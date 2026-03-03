"use client";

import { useEffect, useState, useRef } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "./CatalogSkeleton";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [platform, setPlatform] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchGames = async () => {
        setIsLoading(true);

        const params = new URLSearchParams({
            page: page.toString()
        });

        if (platform) params.append("platform", platform);

        const res = await fetch(`/api/rawg/games?${params.toString()}`);
        const data = await res.json();

        if (page == 1) {
            setGames(data.results);
        } else {
            setGames((prev) => [...prev, ...data.results]);
        }

        setHasMore(Boolean(data.next));
        setIsLoading(false);
    }

    // Fetch game data when filters or page changes
    useEffect(() => {
        fetchGames();
    }, [platform, page]);

    // Infinite load more games as the user hits our ref div
    useEffect(() => {
        if (!observerRef.current || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                console.log('found & is not loading');
                setPage((prev) => prev + 1);
            }
        }, {rootMargin: "0px -100px 0px 0px"});

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    // Placeholder function for filters
    // const handleFilterChange = (value: string) => {
    //     setPlatform(value);
    //     setPage(1);
    //     setGames([]);
    // };

    return (
        <>
            <CatalogGrid games={games} />

            {isLoading && <CatalogSkeleton />}

            <div className="observer w-full h-2" ref={observerRef}></div>
        </>
    )

}