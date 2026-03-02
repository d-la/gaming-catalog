import { sendFetch } from "@/lib/fetch";
import { RawgGame } from "@/types/rawg/game";
import { CatalogHeroSection } from "@/components/catalog/CatalogHero";

export default async function GameDetailsPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params;
    // Fetch game data using slug
    const response: RawgGame = await sendFetch(`https://api.rawg.io/api/games/${slug}`, {
        query: {
            key: `${process.env.RAWG_API_KEY}`
        },
        next: {
            revalidate: 1800
        }
    });

    if (!response) {
        throw new Error("Failed to fetch game.");
    }
  
    return (
        <CatalogHeroSection data={{
            backgroundImage: response.background_image,
            title: response.name,
            description: response.description_raw,
            stores: response.stores,
            developers: response.developers,
            publishers: response.publishers
        }} />
    );
}