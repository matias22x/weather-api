const { getCurrentWeather } = require('../services/weather-map-service');

const getWeatherController = (lat, lon) => {
    return getCurrentWeather(lat, lon);
};

module.exports = {
    getWeatherController
};
