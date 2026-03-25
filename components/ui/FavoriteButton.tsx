"use client";

import { getHoverFocusStateClasses } from "@/utils/getHoverFocusStateClasses";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/contexts/FavoritesContext";
import type { FavoriteGame } from "@/types/favorite";

type FavoriteButtonProps = {
    game: FavoriteGame;
};

export const FavoriteButton = ({ game }: FavoriteButtonProps) => {
    const { data: session } = useSession();
    const { isFavorite, toggleFavorite } = useFavorites();
    const isLoggedIn = !!session;
    const liked = isFavorite(game.slug);

    const hoverStateClasses = getHoverFocusStateClasses(
        ["fill-pink-300", "stroke-pink-300"],
        true
    );

    if (!isLoggedIn) {
        return null;
    }

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label={
                liked
                    ? `Remove ${game.name} from your favorites`
                    : `Add ${game.name} to your favorites`
            }
            className="group cursor-pointer transition-colors duration-300"
            onClick={() => toggleFavorite(game)}
            title={
                liked ? `Remove ${game.name} from favorites` : `Add ${game.name} to favorites`
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 transition-colors duration-300 ${hoverStateClasses} ${liked ? "fill-pink-300 stroke-pink-300" : "stroke-white"}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
        </button>
    );
};
