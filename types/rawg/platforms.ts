// Singular platform data that lives inside "platforms": RawgPlatform[]
export type RawgPlatform = {
    platform: RawgPlatformDetails
}

export type RawgPlatformDetails = {
    id: number,
    name: string,
    slug: string,
    image: string | null
}