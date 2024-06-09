const should = require('should');
const mockery = require('mockery');

describe('get-forecast-controller', () => {
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
        mockery.registerMock('../services/weather-map-service', {
            getForecast: () => {
                return true;
            }
        });

        const getForecastController = require('../../controllers/get-forecast-controller');
        const response = await getForecastController.getForecastController();
        response.should.equal(true);
    });
})