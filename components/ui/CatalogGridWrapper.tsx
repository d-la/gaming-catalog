"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "./CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [stores, setStores] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchGames = useCallback(async () =>{
        setIsLoading(true);

        const params = new URLSearchParams({
            page: page.toString()
        });

        if (stores) params.append("stores", stores);

        const res = await fetch(`/api/rawg/games?${params.toString()}`);
        const data = await res.json();

        if (page == 1) {
            setGames(data.results);
        } else {
            setGames((prev) => [...prev, ...data.results]);
        }

        setHasMore(Boolean(data.next));
        setIsLoading(false);
    }, [page, stores]);

    // Fetch game data when filters or page changes
    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    // Infinite load more games as the user hits our ref div
    useEffect(() => {
        if (!observerRef.current || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                setPage((prev) => prev + 1);
            }
        },
        {
            rootMargin: "0px 0px 400px 0px", threshold: 0
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    // Handle adding filters, value === -1 means the catalog grid should show all games
    const handleFilterChange = (value: string) => {
        if (value !== "-1") {
            setStores(value);
            setPage(1);
            setGames([]);
        } else {
            setStores('');
            setPage(1);
            setGames([]);
        }
    };

    return (
        <>
            <CatalogFilters onStoreChange={handleFilterChange} />
            <CatalogGrid games={games} />
            {isLoading && <CatalogSkeleton />}
            <div className="observer w-full h-64" ref={observerRef}></div>
        </>
    )

}