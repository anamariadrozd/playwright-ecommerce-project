export class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
        this.continueShoppingButton = this.page.getByRole("button", { name: "Continue Shopping" });
        this.removeButton = this.page.getByRole("button", { name: "Remove" });
    }
    async checkout() {
        await this.checkoutButton.click();
    }
    async continueShopping() {
        await this.continueShoppingButton.click();
    }
    async remove() {
        await this.removeButton.click();
    }












}


