import { test, expect } from "@playwright/test";

test.describe("StoreIcons component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/testing/store-icons");
  });

  test("renders the correct icon for each supported store slug", async ({ page }) => {
    const container = page.locator(".store-icons");
    await expect(container).toBeVisible();

    // Steam -> SteamIcon (.bi-steam)
    await expect(container.locator(".bi-steam")).toHaveCount(1);

    // playstation-store -> Ps5Icon (.bi-playstation)
    await expect(container.locator(".bi-playstation")).toHaveCount(1);

    // xbox-store and marketplace.xbox.com -> XboxIcon (.bi-xbox)
    await expect(container.locator(".bi-xbox")).toHaveCount(2);

    // nintendo -> NintendoIcon (.bi-nintendo-switch)
    await expect(container.locator(".bi-nintendo-switch")).toHaveCount(1);
  });
});

