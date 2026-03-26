"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchGames } from "@/lib/fetchGames";

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currentPage = useRef(0);
    const isFetching = useRef(false);

    const maxPagesBeforeLoadButton = 3;
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const stores = searchParams.get("stores") ?? "";

    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadGamesUpToPage = async (targetPage: number, stores: string) => {
        const allGames: RawgGame[] = [];
        let next: string | undefined | null = undefined;

        const startPage = currentPage.current + 1;

        for (let p = startPage; p <= targetPage; p++) {
            const data = await fetchGames(p.toString(), stores);
            allGames.push(...data.results);
            next = data.next;
        }

        if (allGames.length > 0) {
            setGames(prev => [...prev, ...allGames]);
        }

        return next;
    }

    // Track changes to store and reset our games/currentPage whenever stores changes
    useEffect(() => {
        setGames([]);
        currentPage.current = 0;
    }, [stores]);

    const getGames = useCallback(async () => {
        if (isFetching.current) return;

        isFetching.current = true;
        setIsLoading(true);

        const page = searchParams.get("page") ?? 1;
        const stores = searchParams.get("stores") ?? '';

        try {
            // Load all games up to the current page from the query string
            const data = await loadGamesUpToPage(Number(page), stores);

            setHasMore(Boolean(data));
            
            // Set our ref to the current page so we can continue infinite loading as needed
            currentPage.current = Number(page);
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : "Sorry - something went wrong.");
        } finally {
            isFetching.current = false;
        }

        setIsLoading(false);
    }, [searchParams]);

    useEffect(() => {
        getGames()
    }, [getGames]);

    const setQueryParams = () => {
        const nextPage = (Number(searchParams.get("page")) || 1) + 1;
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", nextPage.toString());

        router.push(`?${params.toString()}`, { scroll: false });
    }

    // Infinite load more games as the user hits our ref div
    useEffect(() => {
        if (!observerRef.current || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching.current) {
                setQueryParams();
            }

            // After 2 pages stop observing the observer and show a load more button
            if (currentPage.current > maxPagesBeforeLoadButton) {
                observer.unobserve(observerRef.current as Element);
            }
        },
        {
            rootMargin: "0px 0px 400px 0px", threshold: 0
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore, router, searchParams]); // Lint warning on not including setQueryParams as dependency: purposefully ignoring it as that function does not need to be recached as query params change, which is frequently if the user is scrolling through the page

    if (error) {
        return (
            <section className="section-container">
                <h2 className="mb-2.5">Sorry, looks like something went wrong...</h2>
                <button type="button" className="button-outline mt-5" onClick={() => {window.location.reload(); }}>Refresh the page</button>
            </section>
        );
    }

    return (
        <>
            <CatalogFilters />
            <CatalogGrid games={games} />
            {isLoading && <CatalogSkeleton />}
            <div className={`observer w-full ${currentPage.current > maxPagesBeforeLoadButton ? "h-0" : "h-64"}`} ref={observerRef}></div>
            {currentPage.current > maxPagesBeforeLoadButton && (
                <div className="load-more-container flex justify-center items-center py-7.5">
                    <button className="button-outline cursor-pointer" onClick={setQueryParams}>Load more games</button>
                </div>
            )}
        </>
    )

}