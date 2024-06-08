const createResponseDataMiddleware = (req, res, next) => {
    res.data = [];
    next();
};

module.exports = {
    createResponseDataMiddleware
};
