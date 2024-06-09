const mockery = require('mockery');
const sinon = require('sinon');
const should = require('should');

describe('get-location-middleware', () => {
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

    it('should return ok without location', async () => {
        mockery.registerMock('../controllers/get-location-controller', {
            getLocationFromWeatherMapController: () => {
                return {
                    data: {
                        name: 'test',
                        lat: 1,
                        lon: 1,
                        state: 'test state',
                        country: 'test country'
                    }
                }
            },
            getLocationFromIpApiController: () => {
                return {
                    data: {
                        city: 'test 2',
                        lat: 1,
                        lon: 1,
                        regionName: 'test region',
                        country: 'test country'
                    }
                }
            }
        });

        const req = {
            params: {},
            query: {}
        };
        let res = {
            data: []
        }
        nextSpy = sinon.spy();

        let { getLocationMiddleware } = require('../../middlewares/get-location-middleware');
        await getLocationMiddleware(req, res, nextSpy);
        res.data[0].city.should.equal('test 2');
        res.data[0].lat.should.equal(1);
        res.data[0].lon.should.equal(1);
        res.data[0].region.should.equal('test region');
        res.data[0].country.should.equal('test country');
        nextSpy.called.should.equal(true);
    });

    it('should return ok with location', async () => {
        mockery.registerMock('../controllers/get-location-controller', {
            getLocationFromWeatherMapController: () => {
                return {
                    data: [{
                        name: 'test',
                        lat: 1,
                        lon: 1,
                        state: 'test state',
                        country: 'test country'
                    }]
                }
            },
            getLocationFromIpApiController: () => {
                return {
                    data: {
                        city: 'test 2',
                        lat: 1,
                        lon: 1,
                        regionName: 'test region',
                        country: 'test country'
                    }
                }
            }
        });

        const req = {
            params: {
                city: 'buenos aires'
            },
            query: {}
        };
        let res = {
            data: []
        }
        nextSpy = sinon.spy();

        let { getLocationMiddleware } = require('../../middlewares/get-location-middleware');
        await getLocationMiddleware(req, res, nextSpy);
        res.data[0].city.should.equal('test');
        res.data[0].lat.should.equal(1);
        res.data[0].lon.should.equal(1);
        res.data[0].region.should.equal('test state');
        res.data[0].country.should.equal('test country');
        nextSpy.called.should.equal(true);
    });

    it('should return error', async () => {
        mockery.registerMock('../controllers/get-location-controller', {
            getLocationFromWeatherMapController: () => {
                throw new Error('Error');
            },
            getLocationFromIpApiController: () => {
                return {
                    data: {
                        city: 'test 2',
                        lat: 1,
                        lon: 1,
                        regionName: 'test region',
                        country: 'test country'
                    }
                }
            }
        });

        const req = {
            params: {
                city: 'buenos aires'
            },
            query: {}
        };
        let res = {
            data: [],
            status: (status) => {
                status.should.equal(400);
                return {
                    send: (data) => {
                        data.message.should.equal('Error getting location');
                    }
                }
            }
        }
        nextSpy = sinon.spy();

        let { getLocationMiddleware } = require('../../middlewares/get-location-middleware');
        await getLocationMiddleware(req, res, nextSpy);
        nextSpy.called.should.equal(false);
    });
})