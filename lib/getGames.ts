import games from "@/data/games.json";
import { GameData } from "@/types/models/gameData";

export async function getGames(): Promise<GameData[]> {
    // To be replaced with API call
    return games as GameData[];
}