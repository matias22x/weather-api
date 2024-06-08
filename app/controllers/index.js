const { getForecastController } = require('./get-forecast-controller');
const { getLocationController } = require('./get-location-controller');
const { getWeatherController } = require('./get-weather-controller');
const { sendResponseController } = require('./send-response-controller');
const { welcomeController } = require('./welcome-controller');

module.exports = {
    getForecastController,
    getLocationController,
    getWeatherController,
    sendResponseController,
    welcomeController
};