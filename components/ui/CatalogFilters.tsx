"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/*
    The IDs of PC, PS4, XBOX, NINTENDO respectively - set statically instead of 
    pulling data from an API as the API does not allow great filtering for stores 
    and we don't want platforms like epic games, itch.io, etc
    */
const stores = [
    {
        name: "All",
        id: -1
    },
    {
        name: "Steam",
        id: 1
    },
    {
        name: "PlayStation",
        id: 3
    },
    {
        name: "Xbox",
        id: 2
    },
    {
        name: "Nintendo Switch",
        id: 6
    }
];

export const CatalogFilters = () => {
    const params = useSearchParams();

    const storesParam = params.get("stores");
    const activeStoreId = storesParam ? Number(storesParam) : -1;

    return (
        <section className="section-container">
            <h2 className="pb-2">Filters:</h2>
            <div className="flex flex-row flex-wrap gap-2.5">
                {stores.map((store) => {
                    const isActive = store.id === activeStoreId;
                    
                    return (
                        <Link
                            key={store.id}
                            className={`button-outline cursor-pointer ${isActive ? "button-outline--active" : ""}`}
                            aria-label={store.id !== -1 ? `Filter to show games available on ${store.name}` : `Reset active filters`}
                            href={`/catalog?stores=${store.id}&page=1`}
                        >
                            {store.name}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}