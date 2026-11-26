import {
    test as base,
    APIRequestContext
} from '@playwright/test';

import { config } from '../utils/ConfigReader';

type Fixtures = {
    apiRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({
    apiRequest: async ({ playwright }, use) => {

        const apiRequest =
            await playwright.request.newContext({
                baseURL: config.apiBaseURL
            });

        await use(apiRequest);

        await apiRequest.dispose();
    }
});

export { expect } from '@playwright/test';