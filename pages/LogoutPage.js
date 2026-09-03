export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.menuButton = this.page.getByRole("button", { name: "Open Menu" });
        this.logoutButton = this.page.getByRole("link", { name: "Logout" });
    }
    async openMenu() {
        await this.menuButton.click();
    }
    async logout() {
        await this.logoutButton.click();
    }
}