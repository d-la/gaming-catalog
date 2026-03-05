"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "./CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const observerRef = useRef<HTMLDivElement | null>(null);

    const getGames = useCallback(async () => {
        setIsLoading(true);

        const page = searchParams.get("page") ?? 1;
        const stores = searchParams.get("stores") ?? "";

        const apiParams = new URLSearchParams();

        if (page) apiParams.append("page", page.toString());
        if (stores) apiParams.append("stores", stores);

        const res = await fetch(`/api/rawg/games?${apiParams.toString()}`);
        const data = await res.json();

        if (page == 1) {
            setGames(data.results);
        } else {
            setGames((prev) => [...prev, ...data.results]);
        }

        setHasMore(Boolean(data.next));
        setIsLoading(false);
    }, [searchParams]);

    useEffect(() => {
        getGames()
    }, [getGames]);

    // Infinite load more games as the user hits our ref div
    useEffect(() => {
        if (!observerRef.current || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                const nextPage = (Number(searchParams.get("page")) || 1) + 1;
                const params = new URLSearchParams(searchParams.toString());

                params.set("page", nextPage.toString());

                router.push(`?${params.toString()}`, { scroll: false });
            }
        },
        {
            rootMargin: "0px 0px 400px 0px", threshold: 0
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore, isLoading, router, searchParams]);

    // Handle adding filters, value === -1 means the catalog grid should show all games
    const handleFilterChange = (value: string) => {

        if (value !== "-1") {
            router.push(`?page=1&stores=${value}`);
        } else {
            router.push('');
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