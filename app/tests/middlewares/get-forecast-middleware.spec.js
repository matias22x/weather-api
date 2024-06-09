const mockery = require('mockery');
const sinon = require('sinon');
const should = require('should');

describe('get-forecast-middleware', () => {
    before(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(() => {
        mockery.disable();
    });

    it('should return ok', async () => {
        mockery.registerMock('../controllers/get-forecast-controller', {
            getForecastController: () => {
                return {
                    data: {
                        list: [true]
                    }
                }
            }
        });

        const req = {};
        let res = {
            data: [{
                lat: 10,
                lon: -10
            }]
        }
        nextSpy = sinon.spy();

        let { getForecastMiddleware } = require('../../middlewares/get-forecast-middleware');
        await getForecastMiddleware(req, res, nextSpy);
        res.data[0].forecast[0].should.equal(true);
        nextSpy.called.should.equal(true);
    });

    it('should return ok and location.forecast null', async () => {
        mockery.registerMock('../controllers/get-forecast-controller', {
            getForecastController: () => {
                throw new Error('Error');
            }
        });

        const req = {};
        let res = {
            data: [{
                lat: 10,
                lon: -10
            }],
            status: (status) => {
                status.should.equal(400);
                return {
                    send: (data) => {
                        data.message.should.equal('Error getting actual forecast');
                    }
                }
            },
        }
        nextSpy = sinon.spy();

        let { getForecastMiddleware } = require('../../middlewares/get-forecast-middleware');
        await getForecastMiddleware(req, res, nextSpy);
        should.not.exist(res.data[0].forecast);
        nextSpy.called.should.equal(true);
    });

    it('should return error', async () => {
        mockery.registerMock('../controllers/get-forecast-controller', {
            getForecastController: () => {
                throw new Error('Error');
            }
        });

        const req = {};
        let res = {
            data: {},
            status: (status) => {
                status.should.equal(400);
                return {
                    send: (data) => {
                        data.message.should.equal('Error getting actual forecast');
                    }
                }
            },
        }
        nextSpy = sinon.spy();

        let { getForecastMiddleware } = require('../../middlewares/get-forecast-middleware');
        await getForecastMiddleware(req, res, nextSpy);
        nextSpy.called.should.equal(false);
    });
})