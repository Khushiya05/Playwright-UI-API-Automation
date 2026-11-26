import { test, expect } from '@playwright/test';

import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

import { users, checkout } from '../../src/utils/TestData';


test.describe('SauceDemo - Checkout Tests', () => {


    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);


        await test.step('Open SauceDemo', async () => {

            await loginPage.open();

        });


        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

        });


        await test.step('Add product to cart', async () => {

            await productsPage.addProduct(
                'Sauce Labs Backpack'
            );

        });


        await test.step('Open cart', async () => {

            await productsPage.openCart();

        });


        await test.step('Open checkout', async () => {

            await cartPage.clickCheckout();

        });

    });


    // UI13
    test('UI13 - Complete checkout successfully', async ({ page }) => {

        const checkoutPage = new CheckoutPage(page);


        await test.step('Enter customer information', async () => {

            await checkoutPage.enterCustomerDetails(

                checkout.validCustomer.firstName,

                checkout.validCustomer.lastName,

                checkout.validCustomer.postalCode

            );

        });


        await test.step('Continue to order summary', async () => {

            await checkoutPage.clickContinue();

        });


        await test.step('Verify order summary', async () => {

            await expect(
                checkoutPage.summaryItems.first()
            ).toBeVisible();

            await expect(
                checkoutPage.summarySubtotal
            ).toBeVisible();

            await expect(
                checkoutPage.summaryTax
            ).toBeVisible();

            await expect(
                checkoutPage.summaryTotal
            ).toBeVisible();

        });


        await test.step('Complete order', async () => {

            await checkoutPage.clickFinish();

        });


        await test.step('Verify order confirmation', async () => {

            await expect(
                checkoutPage.confirmationMessage
            ).toHaveText('Thank you for your order!');

        });

    });


    // UI14
    test('UI14 - Checkout validation when first name is missing', async ({ page }) => {

        const checkoutPage = new CheckoutPage(page);


        await test.step('Enter checkout details without first name', async () => {

            await checkoutPage.enterCustomerDetails(

                '',

                checkout.validCustomer.lastName,

                checkout.validCustomer.postalCode

            );

        });


        await test.step('Click Continue', async () => {

            await checkoutPage.clickContinue();

        });


        await test.step('Verify validation error', async () => {

            await expect(
                checkoutPage.errorMessage
            ).toBeVisible();

            await expect(
                checkoutPage.errorMessage
            ).toContainText(
                'First Name is required'
            );

        });

    });


    // UI15
    test('UI15 - Verify order summary and confirmation', async ({ page }) => {

        const checkoutPage = new CheckoutPage(page);


        await checkoutPage.enterCustomerDetails(

            checkout.validCustomer.firstName,

            checkout.validCustomer.lastName,

            checkout.validCustomer.postalCode

        );


        await checkoutPage.clickContinue();


        await test.step('Verify product in order summary', async () => {

            await expect(
                checkoutPage.summaryItems
            ).toHaveCount(1);

        });


        await test.step('Verify subtotal', async () => {

            await expect(
                checkoutPage.summarySubtotal
            ).toBeVisible();

        });


        await test.step('Verify tax', async () => {

            await expect(
                checkoutPage.summaryTax
            ).toBeVisible();

        });


        await test.step('Verify total', async () => {

            await expect(
                checkoutPage.summaryTotal
            ).toBeVisible();

        });


        await test.step('Finish order', async () => {

            await checkoutPage.clickFinish();

        });


        await test.step('Verify confirmation message', async () => {

            await expect(
                checkoutPage.confirmationMessage
            ).toHaveText(
                'Thank you for your order!'
            );

        });

    });

});