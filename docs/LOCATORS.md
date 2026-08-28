# Locator Strategy

This project follows Playwright's official best practices.

## Guiding Principle

Prefer user-facing locators whenever possible.

Use CSS locators only when a user-facing locator is not available or not suitable.

---

## User-facing locators

Use the following locator methods whenever appropriate:

- `getByRole()`
- `getByLabel()`
- `getByPlaceholder()`
- `getByText()`
- `getByAltText()`
- `getByTitle()`
- `getByTestId()`

---

## CSS locators

Use `locator()` only when a user-facing locator is not appropriate.

Prefer stable selectors such as:

- `#id`
- `[data-test="..."]`
- `[data-testid="..."]`

Avoid:

- XPath (unless absolutely necessary)
- Dynamic CSS classes

---

## Project Rules

- Prefer user-facing locators whenever possible.
- Choose the most stable locator available.
- Keep the locator strategy consistent throughout the project.
- Prefer readable locators over complex selectors.
- Follow Playwright best practices.