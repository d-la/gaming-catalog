"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { FeaturedGameCard } from "../FeaturedGameCard";
import { GameData } from "@/types/models/gameData";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type FeaturedSliderProps = {
    games: GameData[]
}

export const FeaturedSlider = ({ games }: FeaturedSliderProps) => {
    return (
        <section id="featured" className="p-10 w-full lg:max-w-7xl mx-auto">
            <div className="featured-slider-container relative">
                <button className="featured-slider-custom-pagination featured-slider-prev cursor-pointer absolute z-2 top-1/2 -translate-y-1/2 -left-6 md:-left-7 lg:-left-8" aria-label="See Prev Slide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="featured-slider-custom-pagination featured-slider-next cursor-pointer absolute z-2 top-1/2 -translate-y-1/2 -right-6 md:-right-7 lg:-right-8" aria-label="See next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    loop={true}
                    navigation={
                        {
                            nextEl: ".featured-slider-next",
                            prevEl: ".featured-slider-prev",
                        }
                    }
                    autoplay={{
                        pauseOnMouseEnter: true
                    }}
                    pagination={{ 
                        clickable: true,
                        type: "progressbar"
                    }}
                    className={`relative featured-slider rounded-lg items-stretch`}
                >
                    {games.length > 0 && games.map((game) => (
                        <SwiperSlide key={game.id} className="h-full self-stretch">
                            <FeaturedGameCard game={game}></FeaturedGameCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}