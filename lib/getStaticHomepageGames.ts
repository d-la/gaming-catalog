import games from "@/data/games.json";
import { GameData } from "@/types/models/gameData";

export async function getStaticHomepageGames(): Promise<GameData[]> {
    // To be replaced with API call
    return games as GameData[];
}