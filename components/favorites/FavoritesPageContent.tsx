"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { FavoriteGameCard } from "@/components/ui/FavoriteGameCard";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";

export const FavoritesPageContent = () => {
    const { status } = useSession();
    const { favorites } = useFavorites();

    if (status === "loading") {
        return <CatalogSkeleton />
    }

    if (status !== "authenticated") {
        return (
            <>
                <p className="text-white mb-4">
                    Sign in to save games to your favorites and view them here.
                </p>
                <Link href="/login" className="button-outline inline-block">
                    Sign in
                </Link>
            </>
        );
    }

    if (favorites.length === 0) {
        return (
            <>
                <p className="text-white mb-4">
                    You have not added any games yet. Browse the catalog and
                    tap the heart on a game card.
                </p>
                <Link href="/catalog" className="button-outline inline-block">
                    Go to catalog
                </Link>
            </>
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
            {favorites.map((game) => (
                <li key={game.slug}>
                    <FavoriteGameCard game={game} />
                </li>
            ))}
        </ul>
    );
};
