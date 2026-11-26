import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly cartItems: Locator;
    readonly cartItemNames: Locator;
    readonly cartItemPrices: Locator;
    readonly removeButtons: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(private page: Page) {

        this.cartItems =
            page.locator('.cart_item');

        this.cartItemNames =
            page.locator('.inventory_item_name');

        this.cartItemPrices =
            page.locator('.inventory_item_price');

        this.removeButtons =
            page.locator('[data-test^="remove"]');

        this.checkoutButton =
            page.locator('[data-test="checkout"]');

        this.continueShoppingButton =
            page.locator('[data-test="continue-shopping"]');
    }

    async removeProduct(productName: string) {

        const product = this.cartItems
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: /Remove/i })
            .click();
    }

    async getCartItemCount() {

        return await this.cartItems.count();
    }

    async getProductNames() {

        return await this.cartItemNames.allTextContents();
    }

    async getProductPrices() {

        return await this.cartItemPrices.allTextContents();
    }

    async clickCheckout() {

        await this.checkoutButton.click();
    }

    async clickContinueShopping() {

        await this.continueShoppingButton.click();
    }
}