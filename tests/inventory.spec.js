import { test } from "../fixtures/pages.fixture"
import { expect } from "@playwright/test";
import { users } from "../test-data/users";


test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(users.standardUser.username, users.standardUser.password);
});

test("@smoke @regression User can add a product to the cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
});

test("@regression User can remove a product from the inventory", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addBackpackToCart();
    await cartPage.remove();
    await expect(page.getByTestId("add-to-cart-sauce-labs-backpack")).toBeVisible();
});

test("@regression User can add multiple products to the cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikelightToCart();
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
});

test("User can open the shopping cart", async ({ page, inventoryPage }) => {
    await inventoryPage.openShoppingCart();
    await expect(page).toHaveURL("/cart.html");
});

test("User can open a product details page", async ({ page, inventoryPage }) => {
    await inventoryPage.openBackpackLink();
    await expect(page).toHaveURL("/inventory-item.html?id=4");
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});

test("User can return to the inventory page", async ({ page, inventoryPage }) => {
    await inventoryPage.openBackpackLink();
    await inventoryPage.backToProducts();
    await expect(page).toHaveURL("/inventory.html");
});

test("@regression User can sort products by name (A to Z)", async ({ inventoryPage }) => {
    await inventoryPage.selectDropdownOption("az");
    const firstProduct = inventoryPage.productNames.first();
    await expect(firstProduct).toHaveText("Sauce Labs Backpack");
});

test("User can sort products by name (Z to A)", async ({ inventoryPage }) => {
    await inventoryPage.selectDropdownOption("za");
    const firstProduct = inventoryPage.productNames.first();
    await expect(firstProduct).toHaveText("Test.allTheThings() T-Shirt (Red)");
});

test("@regression User can sort products by price (Low to High)", async ({ inventoryPage }) => {
    await inventoryPage.selectDropdownOption("lohi");
    const firstProduct = inventoryPage.productNames.first();
    await expect(firstProduct).toHaveText("Sauce Labs Onesie");
});

test("User can sort products by price (High to Low)", async ({ inventoryPage }) => {
    await inventoryPage.selectDropdownOption("hilo");
    const firstProduct = inventoryPage.productNames.first();
    await expect(firstProduct).toHaveText("Sauce Labs Fleece Jacket");
});