import { Hero } from "@/types/models/hero";
import homepageHeroData from "@/data/homepage.json";

export async function getHomepageHero(): Promise<Hero> {
    return homepageHeroData?.hero as Hero;
}