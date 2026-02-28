import { GamingPlatform } from "@/types/GamingPlatform"

export type GameData = {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string[],
    platform: GamingPlatform,
    store: string,
    storeUrl: string,
    mobileImage?: string,
    desktopImage?: string
}
