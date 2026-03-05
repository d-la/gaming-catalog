"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "./CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getStaticStoreId } from "@/utils/getStaticStoreId";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const currentPage = useRef(0);
    const currentStores = useRef('');
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const observerRef = useRef<HTMLDivElement | null>(null);

    const getGames = useCallback(async () => {
        setIsLoading(true);

        const page = searchParams.get("page") ?? 1;
        const stores = searchParams.get("stores") ?? '';

        // If the user has filtered, change our ref so we can load new games properly
        if (currentStores.current !== stores) {
            currentPage.current = 0;
            currentStores.current = stores;
        }

        // Conditional to prevent fetching the same page multiple times
        if (Number(page) > Number(currentPage.current)) {

            const apiParams = new URLSearchParams();

            if (page) apiParams.append("page", page.toString());
            if (stores) {
                // The API accepts stores as a number not a slug. Convert our slug to the correct ID
                const storeId = getStaticStoreId(stores);
                apiParams.append("stores", storeId.toString());
            }

            const res = await fetch(`/api/rawg/games?${apiParams.toString()}`);
            const data = await res.json();

            if (page == 1) {
                setGames(data.results);
            } else {
                setGames((prev) => [...prev, ...data.results]);
            }

            setHasMore(Boolean(data.next));

            // Set our ref to the current page so we can continue infinite loading as needed
            currentPage.current = Number(page);
        }

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

    return (
        <>
            <CatalogFilters />
            <CatalogGrid games={games} />
            {isLoading && <CatalogSkeleton />}
            <div className="observer w-full h-64" ref={observerRef}></div>
        </>
    )

}