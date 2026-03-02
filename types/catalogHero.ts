import { Developer } from "@/types/rawg/developers"
import { Publisher } from "@/types/rawg/publishers"
import { GameStore } from "@/types/Store"

export type CatalogHero = {
    backgroundImage: string | null,
    title: string,
    description: string,
    developers: Developer[],
    publishers: Publisher[],
    stores: GameStore[]
}