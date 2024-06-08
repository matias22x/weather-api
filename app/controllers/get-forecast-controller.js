const { getForecast } = require('../services/weather-map-service');

const getForecastController = (lat, lon) => {
    return getForecast(lat, lon);
};

module.exports = {
    getForecastController
};
