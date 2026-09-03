import { test } from "../fixtures/pages.fixture";
import { expect } from "@playwright/test";
import { users } from "../test-data/users";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test.only("@smoke @regression Standard user can log out successfully", async ({ page, loginPage, logoutPage }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await logoutPage.openMenu();
    await logoutPage.logout();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

});