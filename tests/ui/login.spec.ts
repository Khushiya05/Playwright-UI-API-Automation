import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { users } from '../../src/utils/TestData';

test.describe('SauceDemo - Login Tests', () => {

    test('UI01 - Login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await test.step('Open SauceDemo login page', async () => {
            await loginPage.open();
        });

        await test.step('Login with valid credentials', async () => {

            await loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            );

        });

        await test.step('Verify Products page is displayed', async () => {

            await expect(
                page.locator('.title')
            ).toHaveText('Products');

        });
    });


    test('UI02 - Login with invalid username', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            'invalid_user',
            users.standardUser.password
        );

        await expect(
            loginPage.errorMessage
        ).toBeVisible();
    });


    test('UI03 - Login with invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            users.standardUser.username,
            'wrong_password'
        );

        await expect(
            loginPage.errorMessage
        ).toBeVisible();
    });


    test('UI04 - Login with blank credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.clickLogin();

        await expect(
            loginPage.errorMessage
        ).toBeVisible();
    });

});