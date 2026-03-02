import { sendFetch } from "./fetch";
import { RawgGame } from "@/types/rawg/game";

export type RawgResponse = {
    count?: number,
    next?: string | null,
    previous?: string | null,
    results: RawgGame[]
}

export async function fetchGames() {
    return sendFetch<RawgResponse>(`${process.env.API_BASE_URL}games`, {
      next: { revalidate: 3600 },
      query: {
        key: `${process.env.RAWG_API_KEY}`
      }
    });
}