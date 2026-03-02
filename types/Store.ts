export interface GameStore {
    id: number,
    store: Store
};

export interface Store {
    id: number,
    name: string,
    slug: string,
    domain: string
};