import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") ?? "1";
    const stores = searchParams.get("stores");
    const tags = searchParams.get("tags");

    const query = new URLSearchParams({
        key: `${process.env.RAWG_API_KEY}`,
        page
    });

    if (stores) query.append("stores", stores);
    if (tags) query.append("tags", tags);

    const res = await fetch(`https://api.rawg.io/api/games?${query.toString()}`);

    if (!res.ok) {
        return new Response("Failed to fetch games", { status: 500 });
    }

    const data = await res.json();

    return Response.json(data);
}