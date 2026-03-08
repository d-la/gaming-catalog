"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchGames } from "@/lib/fetchGames";
import Link from "next/link";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const currentPage = useRef(0);
    const currentStores = useRef('');
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadGamesUpToPage = async (targetPage: number, stores: string) => {
        const allGames = [];
        let next: string | undefined | null = undefined;

        for (let p = 1; p <= targetPage; p++) {
            const data = await fetchGames(p.toString(), stores);
            allGames.push(...data.results);
            next = data.next;
        }

        setGames(allGames);

        return next;
    }

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
            try {
                // Load all games up to the current page from the query string
                const data = await loadGamesUpToPage(Number(page), stores);

                setHasMore(Boolean(data));

                // Set our ref to the current page so we can continue infinite loading as needed
                currentPage.current = Number(page);
            } catch (error) {
                console.error(error);
                setError(error instanceof Error ? error.message : "Sorry - something went wrong.");
            }
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

    if (error) {
        return (
            <section className="section-container">
                <h2 className="mb-2.5">Looks like something went wrong...</h2>
                <Link href="/catalog" className="button-outline">Refresh the page</Link>
            </section>
        );
    }

    return (
        <>
            <CatalogFilters />
            <CatalogGrid games={games} />
            {isLoading && <CatalogSkeleton />}
            <div className="observer w-full h-64" ref={observerRef}></div>
        </>
    )

}