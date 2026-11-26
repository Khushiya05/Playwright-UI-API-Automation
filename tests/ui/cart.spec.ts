import { test, expect } from '@playwright/test';

import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { CartPage } from '../../src/pages/CartPage';

import { users } from '../../src/utils/TestData';


test.describe('SauceDemo - Cart Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        await test.step('Open SauceDemo', async () => {

            await loginPage.open();

        });

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

        });

    });


    // UI11
    test('UI11 - Verify added product appears in cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);


        await test.step('Add Sauce Labs Backpack', async () => {

            await productsPage.addProduct(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Open cart', async () => {

            await productsPage.openCart();

        });


        await test.step('Verify product is present in cart', async () => {

            const productNames =
                await cartPage.getProductNames();

            expect(productNames).toContain(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Verify cart contains one item', async () => {

            await expect(
                cartPage.cartItems
            ).toHaveCount(1);

        });

    });


    // UI12
    test('UI12 - Remove product from cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);


        await test.step('Add product to cart', async () => {

            await productsPage.addProduct(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Open cart', async () => {

            await productsPage.openCart();

        });


        await test.step('Remove product', async () => {

            await cartPage.removeProduct(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Verify cart is empty', async () => {

            await expect(
                cartPage.cartItems
            ).toHaveCount(0);

        });

    });


    // UI13
    test('UI13 - Verify multiple products in cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);


        await test.step('Add first product', async () => {

            await productsPage.addProduct(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Add second product', async () => {

            await productsPage.addProduct(
                'Sauce Labs Bike Light'
            );

        });


        await test.step('Add third product', async () => {

            await productsPage.addProduct(
                'Sauce Labs Bolt T-Shirt'
            );

        });


        await test.step('Open cart', async () => {

            await productsPage.openCart();

        });


        await test.step('Verify three products are present', async () => {

            await expect(
                cartPage.cartItems
            ).toHaveCount(3);

        });


        await test.step('Verify product names', async () => {

            const productNames =
                await cartPage.getProductNames();

            expect(productNames).toContain(
                'Sauce Labs Backpack'
            );

            expect(productNames).toContain(
                'Sauce Labs Bike Light'
            );

            expect(productNames).toContain(
                'Sauce Labs Bolt T-Shirt'
            );

        });

    });

});