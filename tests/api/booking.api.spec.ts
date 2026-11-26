import {
    test,
    expect
} from '../../src/fixtures/testFixtures';

import { AuthAPI } from '../../src/api/AuthAPI';
import { BookingAPI } from '../../src/api/BookingAPI';

import {
    booking,
    users
} from '../../src/utils/TestData';


test.describe('Restful Booker - Booking API Tests', () => {


    // ============================================================
    // API03 - GET ALL BOOKINGS
    // ============================================================

    test('API03 - Get all bookings', async ({ apiRequest }) => {

        const bookingAPI =
            new BookingAPI(apiRequest);


        const response = await test.step(
            'Send GET all bookings request',
            async () => {

                return await bookingAPI.getBookings();

            }
        );


        expect(response.status()).toBe(200);


        const responseBody =
            await response.json();


        await test.step(
            'Verify response is an array',
            async () => {

                expect(
                    Array.isArray(responseBody)
                ).toBeTruthy();

            }
        );


        await test.step(
            'Verify bookings are available',
            async () => {

                expect(
                    responseBody.length
                ).toBeGreaterThan(0);

            }
        );

    });


    // ============================================================
    // API04 - GET BOOKING BY ID
    // ============================================================

    test('API04 - Get booking by ID', async ({ apiRequest }) => {

        const bookingAPI =
            new BookingAPI(apiRequest);


        const response =
            await bookingAPI.getBooking(1);


        expect(
            response.status()
        ).toBe(200);


        const responseBody =
            await response.json();


        await test.step(
            'Verify firstname',
            async () => {

                expect(
                    responseBody.firstname
                ).toBeTruthy();

            }
        );


        await test.step(
            'Verify lastname',
            async () => {

                expect(
                    responseBody.lastname
                ).toBeTruthy();

            }
        );


        await test.step(
            'Verify booking dates',
            async () => {

                expect(
                    responseBody.bookingdates
                ).toBeTruthy();

            }
        );

    });


    // ============================================================
    // API05 - INVALID BOOKING ID
    // ============================================================

    test('API05 - Get booking with invalid ID', async ({ apiRequest }) => {

        const bookingAPI =
            new BookingAPI(apiRequest);


        const response =
            await bookingAPI.getBooking(999999);


        await test.step(
            'Verify 404 status',
            async () => {

                expect(
                    response.status()
                ).toBe(404);

            }
        );

    });


    // ============================================================
    // API06 - CREATE BOOKING
    // ============================================================

    test('API06 - Create new booking', async ({ apiRequest }) => {

        const bookingAPI =
            new BookingAPI(apiRequest);


        const response = await test.step(
            'Create booking',
            async () => {

                return await bookingAPI.createBooking(
                    booking.booking
                );

            }
        );


        expect(
            response.status()
        ).toBe(200);


        const responseBody =
            await response.json();


        await test.step(
            'Verify booking ID is generated',
            async () => {

                expect(
                    responseBody.bookingid
                ).toBeTruthy();

            }
        );


        await test.step(
            'Verify firstname',
            async () => {

                expect(
                    responseBody.booking.firstname
                ).toBe(
                    booking.booking.firstname
                );

            }
        );


        await test.step(
            'Verify lastname',
            async () => {

                expect(
                    responseBody.booking.lastname
                ).toBe(
                    booking.booking.lastname
                );

            }
        );

    });


    // ============================================================
    // API07 - CREATE AND GET BOOKING
    // ============================================================

    test('API07 - Verify created booking', async ({ apiRequest }) => {

        const bookingAPI =
            new BookingAPI(apiRequest);


        const createResponse =
            await bookingAPI.createBooking(
                booking.booking
            );


        expect(
            createResponse.status()
        ).toBe(200);


        const createBody =
            await createResponse.json();


        const bookingId =
            createBody.bookingid;


        expect(
            bookingId
        ).toBeTruthy();


        const getResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        await test.step(
            'Verify GET status',
            async () => {

                expect(
                    getResponse.status()
                ).toBe(200);

            }
        );


        const getBody =
            await getResponse.json();


        await test.step(
            'Verify created firstname',
            async () => {

                expect(
                    getBody.firstname
                ).toBe(
                    booking.booking.firstname
                );

            }
        );


        await test.step(
            'Verify created lastname',
            async () => {

                expect(
                    getBody.lastname
                ).toBe(
                    booking.booking.lastname
                );

            }
        );

    });


    // ============================================================
    // API08 - UPDATE BOOKING
    // ============================================================

    test('API08 - Update booking', async ({ apiRequest }) => {

        const authAPI =
            new AuthAPI(apiRequest);

        const bookingAPI =
            new BookingAPI(apiRequest);


        // -----------------------------
        // Create authentication token
        // -----------------------------

        const authResponse =
            await authAPI.createToken(
                users.apiUser.username,
                users.apiUser.password
            );


        expect(
            authResponse.status()
        ).toBe(200);


        const authBody =
            await authResponse.json();


        const token =
            authBody.token;


        expect(
            token
        ).toBeTruthy();


        // -----------------------------
        // Create booking
        // -----------------------------

        const createResponse =
            await bookingAPI.createBooking(
                booking.booking
            );


        expect(
            createResponse.status()
        ).toBe(200);


        const createBody =
            await createResponse.json();


        const bookingId =
            createBody.bookingid;


        expect(
            bookingId
        ).toBeTruthy();


        // -----------------------------
        // Update booking
        // -----------------------------

        const updateResponse =
            await bookingAPI.updateBooking(
                bookingId,
                token,
                booking.updatedBooking
            );


        await test.step(
            'Verify update status',
            async () => {

                expect(
                    updateResponse.status()
                ).toBe(200);

            }
        );


        const updateBody =
            await updateResponse.json();


        await test.step(
            'Verify updated firstname',
            async () => {

                expect(
                    updateBody.firstname
                ).toBe(
                    booking.updatedBooking.firstname
                );

            }
        );


        await test.step(
            'Verify updated price',
            async () => {

                expect(
                    updateBody.totalprice
                ).toBe(
                    booking.updatedBooking.totalprice
                );

            }
        );

    });


    // ============================================================
    // API09 - PARTIAL UPDATE
    // ============================================================

    test('API09 - Partial update booking', async ({ apiRequest }) => {

        const authAPI =
            new AuthAPI(apiRequest);

        const bookingAPI =
            new BookingAPI(apiRequest);


        // -----------------------------
        // Authentication
        // -----------------------------

        const authResponse =
            await authAPI.createToken(
                users.apiUser.username,
                users.apiUser.password
            );


        expect(
            authResponse.status()
        ).toBe(200);


        const authBody =
            await authResponse.json();


        const token =
            authBody.token;


        expect(
            token
        ).toBeTruthy();


        // -----------------------------
        // Create booking
        // -----------------------------

        const createResponse =
            await bookingAPI.createBooking(
                booking.booking
            );


        expect(
            createResponse.status()
        ).toBe(200);


        const createBody =
            await createResponse.json();


        const bookingId =
            createBody.bookingid;


        expect(
            bookingId
        ).toBeTruthy();


        // -----------------------------
        // Partial update
        // -----------------------------

        const patchResponse =
            await bookingAPI.partialUpdateBooking(
                bookingId,
                token,
                {
                    firstname: 'PartialUpdate'
                }
            );


        await test.step(
            'Verify PATCH status',
            async () => {

                expect(
                    patchResponse.status()
                ).toBe(200);

            }
        );


        const patchBody =
            await patchResponse.json();


        await test.step(
            'Verify firstname updated',
            async () => {

                expect(
                    patchBody.firstname
                ).toBe(
                    'PartialUpdate'
                );

            }
        );


        await test.step(
            'Verify lastname remains unchanged',
            async () => {

                expect(
                    patchBody.lastname
                ).toBe(
                    booking.booking.lastname
                );

            }
        );

    });


    // ============================================================
    // API10 - DELETE BOOKING
    // ============================================================

    test('API10 - Delete booking', async ({ apiRequest }) => {

        const authAPI =
            new AuthAPI(apiRequest);

        const bookingAPI =
            new BookingAPI(apiRequest);


        // -----------------------------
        // Authentication
        // -----------------------------

        const authResponse =
            await authAPI.createToken(
                users.apiUser.username,
                users.apiUser.password
            );


        expect(
            authResponse.status()
        ).toBe(200);


        const authBody =
            await authResponse.json();


        const token =
            authBody.token;


        expect(
            token
        ).toBeTruthy();


        // -----------------------------
        // Create booking
        // -----------------------------

        const createResponse =
            await bookingAPI.createBooking(
                booking.booking
            );


        expect(
            createResponse.status()
        ).toBe(200);


        const createBody =
            await createResponse.json();


        const bookingId =
            createBody.bookingid;


        expect(
            bookingId
        ).toBeTruthy();


        // -----------------------------
        // Delete booking
        // -----------------------------

        const deleteResponse =
            await bookingAPI.deleteBooking(
                bookingId,
                token
            );


        await test.step(
            'Verify delete status',
            async () => {

                expect(
                    deleteResponse.status()
                ).toBe(201);

            }
        );


        // -----------------------------
        // Verify booking deleted
        // -----------------------------

        const getResponse =
            await bookingAPI.getBooking(
                bookingId
            );


        await test.step(
            'Verify booking no longer exists',
            async () => {

                expect(
                    getResponse.status()
                ).toBe(404);

            }
        );

    });

});

