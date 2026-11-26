import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { users } from '../../src/utils/TestData';

test.describe('SauceDemo - Product Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });


    test('UI05 - Verify products are displayed', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await expect(
            productsPage.productItems.first()
        ).toBeVisible();

        const products =
            await productsPage.getProductNames();

        expect(products.length).toBeGreaterThan(0);
    });


    test('UI06 - Verify product names and prices', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        const names =
            await productsPage.getProductNames();

        const prices =
            await productsPage.getProductPrices();

        expect(names.length).toBeGreaterThan(0);
        expect(prices.length).toBe(names.length);
    });


    test('UI07 - Sort products by price low to high', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await productsPage.sortProducts('lohi');

        const prices =
            await productsPage.getProductPrices();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices =
            [...numericPrices].sort((a, b) => a - b);

        expect(numericPrices).toEqual(sortedPrices);
    });


    test('UI08 - Sort products by name A to Z', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await productsPage.sortProducts('az');

        const names =
            await productsPage.getProductNames();

        const sortedNames =
            [...names].sort();

        expect(names).toEqual(sortedNames);
    });

});