const mockery = require('mockery');
const should = require('should');

describe('ip-api-service', () => {
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
        mockery.registerMock('../config/config', {
            ipApiUrl: 'test'
        });
        mockery.registerMock('axios', (configuration) => {
            configuration.method.should.equal('get');
            configuration.url.should.equal('test');
            return true;
        });

        const ipApiService = require('../../services/ip-api-service');
        const response = await ipApiService.getLocation();
        response.should.equal(true);
    });
})