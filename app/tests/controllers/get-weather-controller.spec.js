const should = require('should');
const mockery = require('mockery');

describe('get-weather-controller', () => {
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
            getCurrentWeather: () => {
                return true;
            }
        });

        const getWeatherController = require('../../controllers/get-weather-controller');
        const response = await getWeatherController.getWeatherController();
        response.should.equal(true);
    });
})