const mockery = require('mockery');
const should = require('should');

describe('welcome-middleware', () => {
    
    it('should return ok', async () => {
        const welcomeMiddleware = require('../../middlewares/welcome-middleware');
        let req = {};
        let res = {
            status: (status) => {
                status.should.equal(200);
                return {
                    send: (data) => {
                        data.message.should.equal('Welcome to weather API');
                    }
                }
            },
            data: true
        };
        welcomeMiddleware.welcomeMiddleware(req, res);
    });
})