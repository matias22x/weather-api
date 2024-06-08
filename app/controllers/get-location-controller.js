const ipApiService = require('../services/ip-api-service');
const weatherMap = require('../services/weather-map-service');

const getLocationFromWeatherMapController = (location, limit) => {
    return weatherMap.getLocation(location, limit);
};

const getLocationFromIpApiController = () => {
    return ipApiService.getLocation();
};

module.exports = {
    getLocationFromWeatherMapController,
    getLocationFromIpApiController
};
