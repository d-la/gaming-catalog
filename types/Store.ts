export type GameStore = {
    id: number,
    store: Store
};

export type Store = {
    id: number,
    name: string,
    slug: string,
    domain: string
};