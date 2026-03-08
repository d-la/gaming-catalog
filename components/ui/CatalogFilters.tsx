"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { STORES } from '@/constants/stores';

export const CatalogFilters = () => {
    const params = useSearchParams();

    const storesParam = params.get("stores");
    const activeStoreSlug = storesParam ? storesParam : 'all';

    return (
        <section className="section-container">
            <h2 className="pb-2">Filters:</h2>
            <div className="flex flex-row flex-wrap gap-2.5">
                {STORES.map((store) => {
                    const isActive = store.slug === activeStoreSlug;
                    
                    return (
                        <Link
                            key={store.id}
                            className={`button-outline cursor-pointer ${isActive ? "button-outline--active" : ""}`}
                            aria-label={store.id !== -1 ? `Filter to show games available on ${store.name}` : `Reset active filters`}
                            href={`/catalog?stores=${store.slug}&page=1`}
                        >
                            {store.name}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}