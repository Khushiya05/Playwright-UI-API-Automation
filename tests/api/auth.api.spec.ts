import {
    test,
    expect
} from '../../src/fixtures/testFixtures';

import { AuthAPI } from '../../src/api/AuthAPI';
import { users } from '../../src/utils/TestData';


test.describe('Restful Booker - Authentication API Tests', () => {

    test('API01 - Create authentication token', async ({ apiRequest }) => {

        const authAPI = new AuthAPI(apiRequest);

        const response = await authAPI.createToken(
            users.apiUser.username,
            users.apiUser.password
        );

        console.log('URL:', response.url());
        console.log('Status:', response.status());
        console.log('Body:', await response.text());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.token).toBeTruthy();
    });


    test('API02 - Invalid authentication credentials', async ({ apiRequest }) => {

        const authAPI = new AuthAPI(apiRequest);

        const response = await authAPI.createToken(
            'wrong_user',
            'wrong_password'
        );

        console.log('URL:', response.url());
        console.log('Status:', response.status());
        console.log('Body:', await response.text());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.reason).toBeTruthy();
    });

});