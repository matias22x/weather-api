const mockery = require('mockery');
const should = require('should');

describe('weather-map-service', () => {
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
    
    describe('getLocation', () => {
        it('should return ok', async () => {
            mockery.registerMock('axios', (configuration) => {
                configuration.method.should.equal('get');
                configuration.url.should.equal('test/geo/1.0/direct?q=avellaneda&limit=1&appid=test');
                return true;
            });
            mockery.registerMock('../config/config', {
                weatherMap: {
                    url: 'test',
                    apiKey: 'test',
                    forecastDays: 5
                }
            });
    
            const ipApiService = require('../../services/weather-map-service');
            const response = await ipApiService.getLocation('avellaneda', 1);
            response.should.equal(true);
        });
    });

    describe('getCurrentWeather', () => {
        it('should return ok', async () => {
            mockery.registerMock('axios', (configuration) => {
                configuration.method.should.equal('get');
                configuration.url.should.equal('test/data/2.5/weather?lat=1&lon=2&appid=test');
                return true;
            });
            mockery.registerMock('../config/config', {
                weatherMap: {
                    url: 'test',
                    apiKey: 'test',
                    forecastDays: 5
                }
            });
    
            const ipApiService = require('../../services/weather-map-service');
            const response = await ipApiService.getCurrentWeather('1', '2');
            response.should.equal(true);
        });
    });

    describe('getForecast', () => {
        it('should return ok', async () => {
            mockery.registerMock('axios', (configuration) => {
                configuration.method.should.equal('get');
                configuration.url.should.equal( 'test/data/2.5/forecast?lat=1&lon=2&cnt=5&appid=test');
                return true;
            });
            mockery.registerMock('../config/config', {
                weatherMap: {
                    url: 'test',
                    apiKey: 'test',
                    forecastDays: 5
                }
            });
    
            const ipApiService = require('../../services/weather-map-service');
            const response = await ipApiService.getForecast('1', '2');
            response.should.equal(true);
        });
    });

})