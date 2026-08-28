import { test} from "../fixtures/pages.fixture";
import { expect } from "@playwright/test";
import { users } from "../test-data/users";

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(users.standardUser.username, users.standardUser.password);
});

test("User can view an added product in the shopping cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});

test("@smoke @regression User can remove a product from the shopping cart", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.remove();
    await expect(page.getByText("Sauce Labs Backpack")).toHaveCount(0);
});

test("User can continue shopping", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.openShoppingCart();
    await cartPage.continueShopping()
    await expect(page).toHaveURL("/inventory.html");
});

test("User can proceed to checkout", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await expect(page).toHaveURL("/checkout-step-one.html");
});