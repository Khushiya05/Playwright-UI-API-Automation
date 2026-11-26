import { Page, Locator } from '@playwright/test';

export class ProductsPage {

    readonly productItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly sortDropdown: Locator;
    readonly cartLink: Locator;

    constructor(private page: Page) {

        this.productItems =
            page.locator('.inventory_item');

        this.productNames =
            page.locator('.inventory_item_name');

        this.productPrices =
            page.locator('.inventory_item_price');

        this.sortDropdown =
            page.locator('[data-test="product-sort-container"]');

        this.cartLink =
            page.locator('[data-test="shopping-cart-link"]');
    }

    async sortProducts(value: string) {
        await this.sortDropdown.selectOption(value);
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async getProductPrices() {
        return await this.productPrices.allTextContents();
    }

    async addProduct(productName: string) {

        const product = this.productItems
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: /Add to cart/i })
            .click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}