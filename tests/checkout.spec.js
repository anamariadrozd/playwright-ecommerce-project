import { test } from "../fixtures/pages.fixture"
import { expect } from "@playwright/test";
import { users } from "../test-data/users";
import { checkoutInfo } from "../test-data/checkoutInfo";

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto("/");
    await loginPage.login(users.standardUser.username, users.standardUser.password);
});

test("User can continue checkout with valid information", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page).toHaveURL("/checkout-step-two.html");
});

test("User cannot continue checkout without first name", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.emptyCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByRole("heading", { name: "Error: First Name is required" })).toBeVisible();
});

test("User cannot continue checkout without last name", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.emptyCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByRole("heading", { name: "Error: Last Name is required" })).toBeVisible();
});

test("User cannot continue checkout without zip/postal code", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.emptyCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByRole("heading", { name: "Error: Postal Code is required" })).toBeVisible();
});

test("User can cancel checkout and return to cart", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL("/cart.html");
});

test(" @smoke @regression User can finish the order successfully", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(page.getByRole("heading", { name: "Thank you for your order!" })).toBeVisible();
});

test("@regression User cannot continue checkout with all fields empty", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.emptyCheckoutInfo.firstName,checkoutInfo.emptyCheckoutInfo.lastName,checkoutInfo.emptyCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByRole("heading", { name: "Error: First Name is required" })).toBeVisible();
});

test("User can cancel checkout from the overview page", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await checkoutPage.cancel();
    await expect(page).toHaveURL("/inventory.html");
});

test("User can view the added product in checkout overview", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByRole("link", { name: "Sauce Labs Backpack" })).toBeVisible();
});

test("@regression User can view the order total in checkout overview", async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openShoppingCart();
    await cartPage.checkout();
    await checkoutPage.fillForm(checkoutInfo.validCheckoutInfo.firstName,checkoutInfo.validCheckoutInfo.lastName,checkoutInfo.validCheckoutInfo.zipCode);
    await checkoutPage.continue();
    await expect(page.getByTestId("total-label")).toContainText("$32.39");
});