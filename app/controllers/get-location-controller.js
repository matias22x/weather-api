const { getLocation } = require('../services/ip-api-service');

const getLocationController = (location) => {
    return getLocation();
};

module.exports = {
    getLocationController
};
