import { RawgGenre } from "./genres"
import { RawgPlatform } from "./platforms"
import { GameStore } from "@/types/Store"
import { Developer } from "./developers"
import { Publisher } from "./publishers"

export type RawgGame = {
    id: number,
    slug: string,
    name: string,
    background_image: string | null,
    platforms: RawgPlatform[],
    genres: RawgGenre[],
    released: string,
    stores: GameStore[],
    description_raw: string,
    developers: Developer[],
    publishers: Publisher[]
}
