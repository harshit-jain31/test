const module = require('./Node.js');


    Here is an example of how to write unit tests for this function using Jest:

    import { getBillHistory } from './getBillHistory';
    import { expect } from 'chai';
    import { request, response } from 'express';
    import { mockRes } from 'mock-res';
    import { mockNext } from 'mock-next';
    import { mockHandlers } from 'mock-handlers';
    import { mockUtils } from 'mock-utils';
    import { mockDbRequestDurationMetrics } from 'mock-db-request-duration-metrics';
    import { mockErrorCounterMetrics } from 'mock-error-counter-metrics';
    import { mockBuildErrorObject } from 'mock-build-error-object';
    import { mockHttpMetricsOptions } from 'mock-http-metrics-options';

    describe('getBillHistory', () => {
        let res;
        let next;
        let req;
        let handlers;
        let utils;
        let dbRequestDurationMetrics;
        let errorCounterMetrics;
        let buildErrorObject;
        let httpMetricsOptions;

        beforeEach(() => {
            res = mockRes();
            next = mockNext();
            req = request({});
            handlers = mockHandlers();
            utils = mockUtils();
            dbRequestDurationMetrics = mockDbRequestDurationMetrics();
            errorCounterMetrics = mockErrorCounterMetrics();
            buildErrorObject = mockBuildErrorObject();
            httpMetricsOptions = mockHttpMetricsOptions();
        });

        it('should return a 200 status code with the correct response body', () => {
            const msisdn = '1234567890';
            const category = 'BILLING';
            req.params = { msisdn };
            req.query = { category };
            handlers.getBillHistory = jest.fn(() => ({
                statusCode: 200,
                responseBody: [{ id: 1, name: 'Bill' }]
            }));
            utils.getEpochTime = jest.fn(() => 1639459200);
            res.locals.responseBody = { id: 1, name: 'Bill' };
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            expect(res.statusCode).toBe(200);
            expect(res.locals.responseBody).toEqual({ id: 1, name: 'Bill' });
        });

        it('should return a 400 status code with an error message if the msisdn parameter is missing', () => {
            const category = 'BILLING';
            req.params = {};
            req.query = { category };
            handlers.getBillHistory = jest.fn(() => ({
                statusCode: 400,
                errorMessage: 'msisdn is required'
            }));
            utils.getEpochTime = jest.fn(() => 1639459200);
            res.locals.responseBody = { id: 1, name: 'Bill' };
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            expect(res.statusCode).toBe(400);
            expect(res.locals.responseBody).toEqual({ errorMessage: 'msisdn is required' });
        });

        it('should return a 500 status code with an error message if the msisdn parameter is invalid', () => {
            const category = 'BILLING';
            req.params = { msisdn: 'invalid-msisdn' };
            req.query = { category };
            handlers.getBillHistory = jest.fn(() => ({
                statusCode: 500,
                errorMessage: 'Invalid msisdn'
            }));
            utils.getEpochTime = jest.fn(() => 1639459200);
            res.locals.responseBody = { id: 1, name: 'Bill' };
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            expect(res.statusCode).toBe(500);
            expect(res.locals.responseBody).toEqual({ errorMessage: 'Invalid msisdn' });
        });

        it('should return a 400 status code with an error message if the category parameter is missing', () => {
            const msisdn = '1234567890';
            req.params = { msisdn };
            req.query = {};
            handlers.getBillHistory = jest.fn(() => ({
                statusCode: 400,
                errorMessage: 'category is required'
            }));
            utils.getEpochTime = jest.fn(() => 1639459200);
            res.locals.responseBody = { id: 1, name: 'Bill' };
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            expect(res.statusCode).toBe(400);
            expect(res.locals.responseBody).toEqual({ errorMessage: 'category is required' });
        });

        it('should return a 500 status code with an error message if the category parameter is invalid', () => {
            const msisdn = '1234567890';
            req.params = { msisdn };
            req.query = { category: 'invalid-category' };
            handlers.getBillHistory = jest.fn(() => ({
                statusCode: 500,
                errorMessage: 'Invalid category'
            }));
            utils.getEpochTime = jest.fn(() => 1639459200);
            res.locals.responseBody = { id: 1, name: 'Bill' };
            httpMetricsOptions(req, res, CONSTANTS.API_URI.v1.GET_BILLHISTORY);
            expect(res.statusCode).toBe(500);
            expect(res.locals.responseBody).toEqual({ errorMessage: 'Invalid category' });
        });
    });