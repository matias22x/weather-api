const mockery = require('mockery');
const should = require('should');

describe('send-response-middleware', () => {
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
        const sendResponseMiddleware = require('../../middlewares/send-response-middleware');
        let req = {};
        let res = {
            status: (status) => {
                status.should.equal(200);
                return {
                    send: (data) => {
                        data.should.equal(true);
                    }
                }
            },
            data: true
        };
        sendResponseMiddleware.sendResponseMiddleware(req, res, nextSpy);
    });
})