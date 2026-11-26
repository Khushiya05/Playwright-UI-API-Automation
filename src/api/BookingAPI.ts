import {
    APIRequestContext,
    APIResponse
} from '@playwright/test';

export class BookingAPI {

    constructor(private request: APIRequestContext) {}


    // GET all bookings

    async getBookings(): Promise<APIResponse> {

        return await this.request.get('/booking');

    }


    // GET booking by ID

    async getBooking(id: number): Promise<APIResponse> {

        return await this.request.get(`/booking/${id}`);

    }


    // CREATE booking

    async createBooking(data: any): Promise<APIResponse> {

        return await this.request.post('/booking', {

            data: data

        });

    }


    // UPDATE complete booking

    async updateBooking(
        id: number,
        token: string,
        data: any
    ): Promise<APIResponse> {

        return await this.request.put(`/booking/${id}`, {

            headers: {
                Cookie: `token=${token}`
            },

            data: data

        });

    }


    // PARTIAL UPDATE booking

    async partialUpdateBooking(
        id: number,
        token: string,
        data: any
    ): Promise<APIResponse> {

        return await this.request.patch(`/booking/${id}`, {

            headers: {
                Cookie: `token=${token}`
            },

            data: data

        });

    }


    // DELETE booking

    async deleteBooking(
        id: number,
        token: string
    ): Promise<APIResponse> {

        return await this.request.delete(`/booking/${id}`, {

            headers: {
                Cookie: `token=${token}`
            }

        });

    }

}