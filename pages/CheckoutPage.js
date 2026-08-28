export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = this.page.getByPlaceholder("First Name");
        this.lastNameInput = this.page.getByPlaceholder("Last Name");
        this.zipCodeInput = this.page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = this.page.getByRole("button", { name: "Continue" });
        this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
        this.finishButton = this.page.getByRole("button", { name: "Finish" });
    }
    async fillForm(firstName, lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }
    async continue() {
        await this.continueButton.click();
    }
    async cancel() {
        await this.cancelButton.click();
    }
    async finish() {
        await this.finishButton.click();
    }
}