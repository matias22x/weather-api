const { getForecastMiddleware } = require('./get-forecast-middleware');
const { getLocationMiddleware } = require('./get-location-middleware');
const { getWeatherMiddleware } = require('./get-weather-middleware');
const { sendResponseMiddleware } = require('./send-response-middleware');
const { welcomeMiddleware } = require('./welcome-middleware');
const { createResponseDataMiddleware } = require('./create-response-data-middleware');

module.exports = {
    getForecastMiddleware,
    getLocationMiddleware,
    getWeatherMiddleware,
    sendResponseMiddleware,
    welcomeMiddleware,
    createResponseDataMiddleware
};