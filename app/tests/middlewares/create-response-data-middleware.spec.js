const sinon = require('sinon');
const should = require('should');

describe('create-response-data-middleware', () => {
    it('should return ok', async () => {
        const createResponseDataMiddleware = require('../../middlewares/create-response-data-middleware');
        let req = {};
        let res = {};
        nextSpy = sinon.spy();
        await createResponseDataMiddleware.createResponseDataMiddleware(req, res, nextSpy);
        res.data.should.be.an.Array();
        nextSpy.called.should.equal(true);
    });
})