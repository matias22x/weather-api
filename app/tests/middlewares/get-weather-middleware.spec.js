const mockery = require('mockery');
const sinon = require('sinon');
const should = require('should');

describe('get-weather-middleware', () => {
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
        mockery.registerMock('../controllers/get-weather-controller', {
            getWeatherController: () => {
                return {
                    data: true
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

        let { getWeatherMiddleware } = require('../../middlewares/get-weather-middleware');
        await getWeatherMiddleware(req, res, nextSpy);
        res.data[0].weather.should.equal(true);
        nextSpy.called.should.equal(true);
    });

    it('should return ok and location.weather null', async () => {
        mockery.registerMock('../controllers/get-weather-controller', {
            getWeatherController: () => {
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
                        data.message.should.equal('Error getting actual weather');
                    }
                }
            },
        }
        nextSpy = sinon.spy();

        let { getWeatherMiddleware } = require('../../middlewares/get-weather-middleware');
        await getWeatherMiddleware(req, res, nextSpy);
        should.not.exist(res.data[0].weather);
        nextSpy.called.should.equal(true);
    });

    it('should return error', async () => {
        mockery.registerMock('../controllers/get-weather-controller', {
            getWeatherController: () => {
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
                        data.message.should.equal('Error getting actual weather');
                    }
                }
            },
        }
        nextSpy = sinon.spy();

        let { getWeatherMiddleware } = require('../../middlewares/get-weather-middleware');
        await getWeatherMiddleware(req, res, nextSpy);
        nextSpy.called.should.equal(false);
    });
})