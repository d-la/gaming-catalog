import { getGames } from "@/lib/getGames";
import { FeaturedSlider } from "@/components/ui/FeaturedSlider/FeaturedSlider";
import { GameData } from "@/types/models/gameData";
import { getHomepageHero } from "@/lib/getHomepageHero";
import { Hero } from "@/types/models/hero";
import { HeroSection } from "@/components/ui/Hero";

export default async function Home() {
  const games: GameData[] = await getGames();
  const heroData: Hero = await getHomepageHero();

  return (
    <>
      <HeroSection hero={heroData}></HeroSection>
      <FeaturedSlider games={games}></FeaturedSlider>
    </>
  );
}
