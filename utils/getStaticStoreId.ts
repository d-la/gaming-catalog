import { STORES } from "@/constants/stores"

/**
 * Accepts the slug of the store and returns the ID of the store or undefined if the store does not exist
 * 
 * @param slug the slug of the store, taken from the STORES constant
 * @returns the number id of the store
 */
export const getStaticStoreId = (slug: string) => {
    // Create an object where the slug key is mapped to contain the id as the value
    const storesObject = Object.fromEntries(STORES.map(store => [store.slug, store.id]));

    return storesObject[slug];
}