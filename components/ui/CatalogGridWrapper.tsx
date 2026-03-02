import { fetchGames } from "@/lib/fetchGameCatalogData";
import CatalogGrid from "./CatalogGrid";
import { RawgResponse } from "@/lib/fetchGameCatalogData";

export const CatalogGridWrapper = async () => {
    const response: RawgResponse = await fetchGames();

    return <CatalogGrid games={response.results} />
};