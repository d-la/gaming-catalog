/*
    The IDs of PC, PS4, XBOX, NINTENDO respectively - set statically instead of 
    pulling data from an API as the API does not allow great filtering for stores 
    and we don't want platforms like epic games, itch.io, etc.

    Should really be fetched from the API eventually
*/
export type StaticStore = {
    name: string,
    id: number,
    slug: string
}


export const STORES: StaticStore[] = [
    {
        name: "All",
        slug: 'all',
        id: -1
    },
    {
        name: "Steam",
        slug: 'steam',
        id: 1
    },
    {
        name: "PlayStation",
        slug: 'playstation',
        id: 3
    },
    {
        name: "Xbox",
        slug: 'xbox',
        id: 2
    },
    {
        name: "Nintendo Switch",
        slug: 'nintendo-switch',
        id: 6
    }
];