export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchConfig<TBody = unknown> {
    method?: HttpMethod,
    headers?: HeadersInit,
    body?: TBody,
    query?: Record<string, string | number | boolean | undefined>;
    next?: NextFetchRequestConfig;
    cache?: RequestCache;
}

export interface ApiError {
    message: string;
    status: number;
}

const buildUrl = (baseUrl: string, query?: Record<string, string | number | boolean | undefined>) => {
    if (!query) return baseUrl;

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
            params.append(key, String(value));
        }
    });

    return `${baseUrl}?${params.toString()}`;
}

export async function sendFetch<TResponse, TBody = unknown>(
    url: string, 
    config: FetchConfig<TBody> = {}
): Promise<TResponse> {
    const {
        method = "GET",
        headers,
        body,
        query,
        next,
        cache
    } = config;

    const finalUrl = buildUrl(url, query);

    const response = await fetch(finalUrl, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        next,
        cache
    });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw {
            message: errorMessage || "Something went wrong",
            status: response.status
        } as ApiError;
    }

    return response.json() as Promise<TResponse>;
};