import { test } from "../fixtures/pages.fixture";
import { expect } from "@playwright/test";
import { users } from "../test-data/users";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("@smoke @regression Standard user can log in successfully", async ({ page, loginPage }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByText("Products")).toBeVisible();
});

test("@regression Locked out user cannot log in", async ({ page, loginPage }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);
    await expect(page).toHaveURL("/");  //console.log(page.url());
    await expect(page.getByText("Epic sadface: Sorry, this user has been locked out")).toBeVisible();
});

test("@regression User cannot log in with an invalid password", async ({ page, loginPage }) => {
    await loginPage.login(users.standardUser.username, users.invalidCredentials.password);
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("@regression User cannot log in with an invalid username", async ({ page, loginPage }) => {
    await loginPage.login(users.invalidCredentials.username, users.standardUser.password);
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("User cannot log in with an empty username", async ({ page, loginPage }) => {
    await loginPage.login(users.emptyCredentials.username, users.standardUser.password);
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
});

test("User cannot log in with an empty password", async ({ page, loginPage }) => {
    await loginPage.login(users.standardUser.username, users.emptyCredentials.password);
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
});

test("User cannot log in with empty credentials", async ({ page, loginPage }) => {
    await loginPage.login(users.emptyCredentials.username, users.emptyCredentials.password);
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
});
