export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.backpackAddButton = this.page.getByTestId("add-to-cart-sauce-labs-backpack");
        this.bikelightAddButton = this.page.getByTestId("add-to-cart-sauce-labs-bike-light");
        this.sortDropdown = this.page.getByTestId("product-sort-container");
        this.productNames = this.page.getByTestId("inventory-item-name");
        this.cartLink = this.page.getByTestId("shopping-cart-link");
        this.backpackLink = this.page.getByTestId("item-4-title-link");
        this.backToProductsButton = this.page.getByTestId("back-to-products");
    }
    async addBackpackToCart() {
        await this.backpackAddButton.click();
    }
    async addBikelightToCart() {
        await this.bikelightAddButton.click();
    }
    async selectDropdownOption(dropdownOption) {
        await this.sortDropdown.selectOption(dropdownOption);
    }
    async openShoppingCart() {
        await this.cartLink.click();
    }
    async openBackpackLink() {
        await this.backpackLink.click();
    }
    async backToProducts() {
        await this.backToProductsButton.click();
    }
}