// tests/catalog-grid.spec.ts
import { test, expect } from "@playwright/test";

// Simple mock data for two pages of games.
// Only include fields actually used by your UI: slug, name, background_image, stores.
const page1Response = {
    count: 4,
    next: "/api/rawg/games?page=1",
    previous: null,
    results: [
        {
            id: 1,
            slug: "mock-game-1",
            name: "Mock Game 1",
            background_image: null,
            platforms: [],
            genres: [],
            released: "2024-01-01",
            stores: [],
            description_raw: "",
            developers: [],
            publishers: [],
        },
        {
            id: 2,
            slug: "mock-game-2",
            name: "Mock Game 2",
            background_image: null,
            platforms: [],
            genres: [],
            released: "2024-01-02",
            stores: [],
            description_raw: "",
            developers: [],
            publishers: [],
        },
    ],
};

const page2Response = {
    count: 4,
    next: null,
    previous: "/api/rawg/games?page=2",
    results: [
        {
            id: 3,
            slug: "mock-game-3",
            name: "Mock Game 3",
            background_image: null,
            platforms: [],
            genres: [],
            released: "2024-01-03",
            stores: [],
            description_raw: "",
            developers: [],
            publishers: [],
        },
        {
            id: 4,
            slug: "mock-game-4",
            name: "Mock Game 4",
            background_image: null,
            platforms: [],
            genres: [],
            released: "2024-01-04",
            stores: [],
            description_raw: "",
            developers: [],
            publishers: [],
        },
    ],
};

test.describe("CatalogGridWrapper (infinite catalog grid)", () => {
    test.beforeEach(async ({ page }) => {
        // Mock the RAWG proxy API before navigation so every request is intercepted.
        await page.route("**/api/rawg/games?*", async (route) => {
            const url = new URL(route.request().url());
            const pageParam = url.searchParams.get("page") ?? "1";

            let body;
            if (pageParam === "1") {
                body = page1Response;
            } else if (pageParam === "2") {
                body = page2Response;
            } else {
                body = { count: 0, next: null, previous: null, results: [] };
            }

            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });

        await page.goto("/testing/catalog-grid");
    });

    test("loads the initial page of games", async ({ page }) => {
        const cards = page.locator(".catalog-grid article");

        // Wait for the first page of games to render.
        await expect(cards).toHaveCount(2);

        // Basic content sanity check.
        await expect(page.getByText("Mock Game 1")).toBeVisible();
        await expect(page.getByText("Mock Game 2")).toBeVisible();
    });

    test("loads the next page on infinite scroll without duplicates", async ({ page }) => {
        const cards = page.locator(".catalog-grid article");

        // Initial: 2 cards from page 1.
        await expect(cards).toHaveCount(2);

        // Scroll the observer sentinel into view to trigger the IntersectionObserver.
        const sentinel = page.locator(".observer");
        await sentinel.scrollIntoViewIfNeeded();

        // After infinite scroll: 4 cards (2 from page 1 + 2 from page 2).
        await expect(cards).toHaveCount(4);

        // Ensure there are no duplicate "View Game" links (slug-based uniqueness).
        const viewLinks = page.getByRole("link", { name: "View Game" });
        const hrefs = await viewLinks.evaluateAll((els) =>
            els.map((el) => (el as HTMLAnchorElement).getAttribute("href"))
        );

        const uniqueHrefs = new Set(hrefs);
        expect(uniqueHrefs.size).toBe(hrefs.length);
    });
});

// Test an error from the API
test("shows a friendly error when the catalog API fails", async ({ page }) => {
    await page.route("**/api/rawg/games?*", async (route) => {
        // Simulate a network failure or server error
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ message: "Internal Server Error" }),
        });
    });
    await page.goto("/testing/catalog-grid");

    // Example if you add an error message:
    await expect(page.getByText(/Looks like something went wrong.../i)).toBeVisible();
    // And the grid shouldn't render games
    await expect(page.locator(".catalog-grid article")).toHaveCount(0);
});