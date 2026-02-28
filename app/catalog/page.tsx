import { fetchGames } from "@/lib/fetchGameCatalogData";
import CatalogGrid from "@/components/ui/CatalogGrid";
import { RawgResponse } from "@/lib/fetchGameCatalogData";

export default async function CatalogPage() {
    const response: RawgResponse = await fetchGames();

    return (
        <>
            <section className="section-container pb-0">
                <h1 className="">Games Catalog</h1>
            </section>
            <CatalogGrid games={response.results} />
        </>
    );
}