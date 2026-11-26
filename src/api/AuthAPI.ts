import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthAPI {

    constructor(private request: APIRequestContext) {}

    async createToken(
        username: string,
        password: string
    ): Promise<APIResponse> {

        return await this.request.post('/auth', {
            data: {
                username,
                password
            }
        });
    }
}