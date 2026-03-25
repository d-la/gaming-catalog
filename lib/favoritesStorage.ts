import type { FavoriteGame } from "@/types/favorite";

const STORAGE_PREFIX = "gaming-catalog-favorites:";

export function getFavoritesStorageKey(userId: string) {
    return `${STORAGE_PREFIX}${userId}`;
}

function isFavoriteGame(item: unknown): item is FavoriteGame {
    if (typeof item !== "object" || item === null) return false;
    const o = item as Record<string, unknown>;
    return (
        typeof o.slug === "string" &&
        typeof o.name === "string" &&
        typeof o.id === "number" &&
        (o.background_image === null || typeof o.background_image === "string")
    );
}

export function readFavoritesFromStorage(userId: string): FavoriteGame[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(getFavoritesStorageKey(userId));
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isFavoriteGame);
    } catch {
        return [];
    }
}

export function writeFavoritesToStorage(
    userId: string,
    favorites: FavoriteGame[]
): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(
        getFavoritesStorageKey(userId),
        JSON.stringify(favorites)
    );
}
