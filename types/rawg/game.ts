import { RawgGenre } from "./genres"
import { RawgPlatform } from "./platforms"

export type RawgGame = {
    id: number,
    slug: string,
    name: string,
    background_image: string | null,
    platforms: RawgPlatform[],
    genres: RawgGenre[],
    released: string
}
