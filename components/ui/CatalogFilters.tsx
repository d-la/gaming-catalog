"use client";

import { useState } from "react";

type CatalogFiltersProps = {
    onStoreChange: (platform: string) => void
}

export const CatalogFilters = ({ onStoreChange }: CatalogFiltersProps) => {
    const [activeStore, setActiveStore] = useState<string | null>('All');

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

    return (
        <section className="section-container">
            <h2 className="pb-2">Filters:</h2>
            <div className="flex flex-col md:flex-row gap-2.5">
                {stores.map((store) => (
                    <button 
                        key={store.id} 
                        onClick={() => {
                            onStoreChange(`${store.id}`);
                            setActiveStore(`${store.name}`)
                        }}
                        className={`button-outline cursor-pointer ${activeStore == store.name ? "button-outline--active" : ""}`}
                        aria-label={store.id !== -1 ? `Filter to show games available on ${store.name}` : `Reset active filters`}
                    >
                        {store.name}
                    </button>
                ))}
            </div>
        </section>
    )
}