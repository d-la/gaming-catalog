"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSession } from "next-auth/react";
import type { FavoriteGame } from "@/types/favorite";
import {
    readFavoritesFromStorage,
    writeFavoritesToStorage,
} from "@/lib/favoritesStorage";

type FavoritesContextValue = {
    favorites: FavoriteGame[];
    isFavorite: (slug: string) => boolean;
    toggleFavorite: (game: FavoriteGame) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function getUserStorageKey(session: {
    user?: { id?: string | null; email?: string | null } | null;
} | null): string | null {
    if (!session?.user) return null;
    const id = session.user.id;
    const email = session.user.email;
    if (id && String(id).length > 0) return String(id);
    if (email && email.length > 0) return email;
    return null;
}

type FavoritesStoreProps = {
    userKey: string | null;
    status: "loading" | "authenticated" | "unauthenticated";
    children: React.ReactNode;
};

const FavoritesStore = ({ userKey, status, children }: FavoritesStoreProps) => {
    const [favorites, setFavorites] = useState<FavoriteGame[]>(() => {
        if (status !== "authenticated" || !userKey) return [];
        return readFavoritesFromStorage(userKey);
    });

    useEffect(() => {
        if (status !== "authenticated" || !userKey) return;
        writeFavoritesToStorage(userKey, favorites);
    }, [favorites, userKey, status]);

    const isFavorite = useCallback(
        (slug: string) => favorites.some((g) => g.slug === slug),
        [favorites]
    );

    const toggleFavorite = useCallback((game: FavoriteGame) => {
        setFavorites((prev) => {
            const exists = prev.some((g) => g.slug === game.slug);
            if (exists) {
                return prev.filter((g) => g.slug !== game.slug);
            }
            return [...prev, game];
        });
    }, []);

    const value = useMemo<FavoritesContextValue>(
        () => ({
            favorites,
            isFavorite,
            toggleFavorite,
        }),
        [favorites, isFavorite, toggleFavorite]
    );

    return (
        <FavoritesContext value={value}>
            {children}
        </FavoritesContext>
    );
};

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { data: session, status } = useSession();
    const userKey = getUserStorageKey(session);

    const storeKey =
        status === "loading"
            ? "__session_loading__"
            : (userKey ?? "__guest__");

    return (
        <FavoritesStore key={storeKey} userKey={userKey} status={status}>
            {children}
        </FavoritesStore>
    );
};

export function useFavorites(): FavoritesContextValue {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return ctx;
}
