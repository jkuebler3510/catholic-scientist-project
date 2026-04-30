import { test, expect } from "@playwright/test";

test("should render home page with heading", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("h1");
  await expect(heading).toHaveText("Society of Catholic Scientists");
});
