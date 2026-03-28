import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 500, height: 800 } });

test.describe("Mobile Navigation clicks", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/testing/mobile-navigation");
    });

    test("mobile navigation button click at default hidden state, expecting the mobile sidebar to show", async ({ page }) => {
        const headerMobileToggle = page.locator(".mobile-nav-toggle");
        const mobileSidebar = page.locator('.mobile-sidebar-nav');

        await expect(headerMobileToggle).toBeVisible();
        await expect(mobileSidebar).not.toBeInViewport();

        await headerMobileToggle.click();

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).toBeInViewport();
    });

    test("clicking outside of the mobile navigation sidebar closes the sidebar", async ({ page }) => {
        const headerMobileToggle = page.locator(".mobile-nav-toggle");
        const mobileSidebar = page.locator('.mobile-sidebar-nav');
        const main = page.locator('main');

        await expect(main).toBeVisible();
        await expect(headerMobileToggle).toBeVisible();
        await expect(mobileSidebar).not.toBeInViewport();

        await headerMobileToggle.click();

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).toBeInViewport();

        await main.click({ position: { x: 490, y: 400 } }); // click far edge of the screen

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).not.toBeInViewport();
    });

    test("clicking the close button from within the mobile sidebar when its active closes the mobile sidebar", async ({ page }) => {
        const headerMobileToggle = page.locator(".mobile-nav-toggle");
        const mobileSidebar = page.locator('.mobile-sidebar-nav');
        const sidebarToggle = page.locator('.sidebar-toggle');

        await expect(sidebarToggle).toBeVisible();
        await expect(headerMobileToggle).toBeVisible();
        await expect(mobileSidebar).not.toBeInViewport();

        await headerMobileToggle.click();

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).toBeInViewport();

        await sidebarToggle.click();

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).not.toBeInViewport();
    });

    test("clicking an item in the mobile sidebar closes the mobile siderbar", async ({ page }) => {
        const headerMobileToggle = page.locator(".mobile-nav-toggle");
        const mobileSidebar = page.locator('.mobile-sidebar-nav');
        const firstSidebaritem = page.locator('.mobile-sidebar-navigation li:first-of-type a');

        await expect(headerMobileToggle).toBeVisible();
        await expect(mobileSidebar).not.toBeInViewport();

        await headerMobileToggle.click();

        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).toBeInViewport();

        await firstSidebaritem.click();
        
        await page.waitForTimeout(350); // allow the transition to occur
        await expect(mobileSidebar).not.toBeInViewport();
    });
});

