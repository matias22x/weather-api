const mockery = require('mockery');
const sinon = require('sinon');
const should = require('should');
const request = require('supertest');
const express = require('express');

describe('/v1/forecast/city?', () => {
    beforeEach(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock('../config/config', {
            port: 3000,
            ipApiUrl: 'http://ipapitest',
            weatherMap: {
                url: 'http://weathermapurl',
                apiKey: '123',
                forecastDays: 5
            }
        });

        mockery.registerMock('axios', (configuration) => {
            let response = {};
            switch(configuration.url) {
                case 'http://ipapitest/geo/1.0/direct?q=testcity&limit=1&appid=123':
                    response.data = [{
                        name: 'name',
                        lat: 1,
                        lon: -1,
                        state: 'state',
                        country: 'country'
                    }];
                    break;
                case 'http://ipapitest/geo/1.0/direct?q=testcityerror&limit=1&appid=123':
                    response.data = 'error';
                    break;
                case 'http://weathermapurl/geo/1.0/direct?q=testcity&limit=1&appid=123':
                    response.data = [{
                        name: 'name',
                        lat: 1,
                        lon: -1,
                        state: 'state',
                        country: 'country'
                    }]
                    break;
                case 'http://ipapitest':
                    response.data = {
                        city: 'city',
                        lat: 1,
                        lon: -1,
                        regionName: 'region',
                        country: 'country'

                    }
                    break;
                case 'http://weathermapurl/data/2.5/forecast?lat=1&lon=-1&cnt=5&appid=123':
                    response.data = {
                        list: [{
                            data: true
                        }]
                    }
                    break;
            }
            if(response.data === 'error') {
                return Promise.reject('Error');
            }
            return Promise.resolve(response);
        });

        const router = require('../../routes/api-routes');
        this.app = express();
        this.app.use('/v1', router);

    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    it(('with city - status 200'), () => {
        request(this.app)
            .get('/v1/forecast/testcity')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body[0].city.should.equal('name');
                res.body[0].lat.should.equal(1);
                res.body[0].lon.should.equal(-1);
                res.body[0].region.should.equal('state');
                res.body[0].country.should.equal('country');
                res.body[0].forecast[0].data.should.equal(true);
            });
    });

    it(('with city - status 400'), () => {
        request(this.app)
            .get('/v1/forecast/testcityerror')
            .expect(400)
            .end(function(err, res) {
                if (err) throw err;
                res.body.message.should.equal('Error getting location');
            });    
    });

    it(('without city - status 200'), () => {
        request(this.app)
            .get('/v1/forecast/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body[0].city.should.equal('city');
                res.body[0].lat.should.equal(1);
                res.body[0].lon.should.equal(-1);
                res.body[0].region.should.equal('region');
                res.body[0].country.should.equal('country');
            });
    });
})