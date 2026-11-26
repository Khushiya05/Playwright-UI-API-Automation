import dotenv from 'dotenv';

dotenv.config({
    path: 'config/.env.qa'
});

export const config = {
    baseURL: process.env.BASE_URL || '',
    apiBaseURL: process.env.API_BASE_URL || '',
    environment: process.env.ENVIRONMENT || 'qa'
};