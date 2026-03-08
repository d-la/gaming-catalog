import { getStaticStoreId } from "@/utils/getStaticStoreId";
import { RawgResponse } from "./fetchGameCatalogData";

export const fetchGames = async (page: string, stores: string): Promise<RawgResponse> => {
    const apiParams = new URLSearchParams();

    if (page) apiParams.append("page", page.toString());
    if (stores) {
        // The API accepts stores as a number not a slug. Convert our slug to the correct ID
        const storeId = getStaticStoreId(stores);
        apiParams.append("stores", storeId.toString());
    }

    const res = await fetch(`/api/rawg/games?${apiParams.toString()}`);

    if (!res.ok) {
        console.error(res);
        throw new Error(`Failed to fetch games: ${res.status}`);
    }

    const data = await res.json();

    return data;
}