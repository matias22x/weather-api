const should = require('should');
const mockery = require('mockery');

describe('get-location-controller', () => {
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

    describe('getLocationFromWeatherMapController', () => {
        it('should return ok', async () => {
            mockery.registerMock('../services/weather-map-service', {
                getLocation: () => {
                    return true;
                }
            });
    
            const getLocationController = require('../../controllers/get-location-controller');
            const response = await getLocationController.getLocationFromWeatherMapController();
            response.should.equal(true);
        });
    })

    describe('getLocationFromIpApiController', () => {
        it('should return ok', async () => {
            mockery.registerMock('../services/ip-api-service', {
                getLocation: () => {
                    return true;
                }
            });
    
            const getLocationController = require('../../controllers/get-location-controller');
            const response = await getLocationController.getLocationFromIpApiController();
            response.should.equal(true);
        });
    })

})