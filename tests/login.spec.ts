import { test, expect } from "@playwright/test";

test.describe("Login (credentials)", () => {
    test("logs in with valid credentials and reaches /account-information", async ({ page }) => {
        await page.goto("/login");

        await expect(page.locator("#login-email")).toBeVisible();
        await page.fill("#login-email", "test@test.com");
        await page.fill("#login-password", "password");

        await page.getByRole("button", { name: "Sign In" }).click();

        await expect(page).toHaveURL(/\/account-information/);
        await expect(page.getByRole("heading", { name: "Account Information" })).toBeVisible();
    });

    test("redirects to /login when logged out for /favorites", async ({ page }) => {
        // Ensure we start unauthenticated for this test.
        await page.context().clearCookies();

        await page.goto("/favorites");

        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator("#login-email")).toBeVisible();
    });

    test("redirects to /login when logged out for /account-information", async ({ page }) => {
        // Ensure we start unauthenticated for this test.
        await page.context().clearCookies();

        await page.goto("/account-information");

        await expect(page).toHaveURL(/\/login/);
        await expect(page.locator("#login-email")).toBeVisible();
    });

    test("shows an error with invalid credentials", async ({ page }) => {
        await page.goto("/login");

        await page.fill("#login-email", "test@test.com");
        await page.fill("#login-password", "wrong-password");

        await page.getByRole("button", { name: "Sign In" }).click();

        await expect(page.getByText("Invalid email or password.")).toBeVisible();
        // Optional: ensure we stayed on login
        // await expect(page).toHaveURL(/\/login/);
    });
});