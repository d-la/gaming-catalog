"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import CatalogGrid from "./CatalogGrid";
import { RawgGame } from "@/types/rawg/game";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";
import { CatalogFilters } from "./CatalogFilters";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchGames } from "@/lib/fetchGames";

const MAX_PAGES_BEFORE_LOAD_BUTTON = 5;

// Derive a stable string key from all filter-type params (everything except "page").
// Adding a new filter (e.g. "genre") requires zero changes here.
function getFilterKey(searchParams: URLSearchParams): string {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.sort();
    return params.toString();
}

export const CatalogGridWrapper = () => {
    const [games, setGames] = useState<RawgGame[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isFetching = useRef(false);
    // Tracks the highest page already rendered in the grid so we only fetch the delta.
    // Reset to 0 whenever filters change.
    const loadedUpTo = useRef(0);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page") || 1);
    const filterKey = getFilterKey(searchParams);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const syncGames = async () => {
            isFetching.current = true;
            setIsLoading(true);
            setError(null);

            const stores = searchParams.get("stores") ?? "";

            try {
                // If loadedUpTo is ahead of or equal to currentPage, the grid is
                // already showing everything we need — nothing to fetch.
                if (loadedUpTo.current >= currentPage) return;

                const startPage = loadedUpTo.current + 1;
                const newGames: RawgGame[] = [];
                let next: string | null | undefined;

                for (let p = startPage; p <= currentPage; p++) {
                    if (signal.aborted) return;

                    const data = await fetchGames(p.toString(), stores);
                    newGames.push(...data.results);
                    next = data.next;
                }

                if (signal.aborted) return;

                // Append only the new pages — existing games stay in the grid.
                setGames(prev => [...prev, ...newGames]);
                setHasMore(Boolean(next));
                loadedUpTo.current = currentPage;
            } catch (err) {
                if (!signal.aborted) {
                    console.error(err);
                    setError(err instanceof Error ? err.message : "Sorry - something went wrong.");
                }
            } finally {
                if (!signal.aborted) {
                    isFetching.current = false;
                    setIsLoading(false);
                }
            }
        };

        syncGames();

        return () => controller.abort();

    // filterKey changing means filters changed — see below effect for the reset.
    // currentPage changing means the user scrolled or clicked load more.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filterKey]);

    // When filters change, reset the grid and loadedUpTo so syncGames fetches
    // from page 1 again. Kept as a separate effect so the reset is atomic
    // and runs before the fetch effect picks up the new filterKey.
    useEffect(() => {
        setGames([]);
        loadedUpTo.current = 0;
    }, [filterKey]);

    const advancePage = useCallback(() => {
        if (isFetching.current) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (currentPage + 1).toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchParams, currentPage, router]);

    // Intersection observer — only attaches when we're still in auto-scroll range.
    useEffect(() => {
        const sentinel = observerRef.current;
        if (!sentinel || !hasMore || currentPage >= MAX_PAGES_BEFORE_LOAD_BUTTON) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetching.current) {
                    advancePage();
                }
            },
            { rootMargin: "0px 0px 400px 0px", threshold: 0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, currentPage, advancePage]);

    if (error) {
        return (
            <section className="section-container">
                <h2 className="mb-2.5">Sorry, looks like something went wrong...</h2>
                <button
                    type="button"
                    className="button-outline mt-5"
                    onClick={() => window.location.reload()}
                >
                    Refresh the page
                </button>
            </section>
        );
    }

    const showLoadMoreButton = currentPage >= MAX_PAGES_BEFORE_LOAD_BUTTON && hasMore;

    return (
        <>
            <CatalogFilters />
            <CatalogGrid games={games} />
            {isLoading && <CatalogSkeleton />}
            <div ref={observerRef} className={`w-full ${showLoadMoreButton ? 'h-0' : 'h-64'}`} />
            {showLoadMoreButton && (
                <div className="load-more-container flex justify-center items-center py-7.5">
                    <button className="button-outline cursor-pointer" onClick={advancePage}>
                        Load more games
                    </button>
                </div>
            )}
        </>
    );
};