import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;

    readonly errorMessage: Locator;

    readonly summaryItems: Locator;
    readonly summarySubtotal: Locator;
    readonly summaryTax: Locator;
    readonly summaryTotal: Locator;

    readonly confirmationMessage: Locator;

    constructor(private page: Page) {

        this.firstNameInput =
            page.locator('[data-test="firstName"]');

        this.lastNameInput =
            page.locator('[data-test="lastName"]');

        this.postalCodeInput =
            page.locator('[data-test="postalCode"]');

        this.continueButton =
            page.locator('[data-test="continue"]');

        this.cancelButton =
            page.locator('[data-test="cancel"]');

        this.finishButton =
            page.locator('[data-test="finish"]');

        this.errorMessage =
            page.locator('[data-test="error"]');

        this.summaryItems =
            page.locator('.cart_item');

        this.summarySubtotal =
            page.locator('.summary_subtotal_label');

        this.summaryTax =
            page.locator('.summary_tax_label');

        this.summaryTotal =
            page.locator('.summary_total_label');

        this.confirmationMessage =
            page.locator('.complete-header');
    }


    async enterCustomerDetails(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {

        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.postalCodeInput.fill(postalCode);
    }


    async clickContinue() {

        await this.continueButton.click();
    }


    async clickFinish() {

        await this.finishButton.click();
    }


    async getErrorMessage() {

        return await this.errorMessage.textContent();
    }


    async getOrderConfirmation() {

        return await this.confirmationMessage.textContent();
    }
}