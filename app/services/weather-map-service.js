const axios = require('axios');
const { weatherMap } = require('../config/config');

const getLocation = (location, limit) => {
    const configuration = {
        method: 'get',
        url: `${weatherMap.url}/geo/1.0/direct?q=${location}&limit=${limit}&appid=${weatherMap.apiKey}`
    };
    return axios(configuration);
}

const getCurrentWeather = (lat, lon) => {
    console.log(`Getting current weather for lat ${lat} and lon ${lon}`);
    const configuration = {
        method: 'get',
        url: `${weatherMap.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherMap.apiKey}`
    };
    return axios(configuration);
}

const getForecast = (lat, lon) => {
    console.log(`Getting forecast for lat ${lat} and lon ${lon}`);
    const configuration = {
        method: 'get',
        url: `${weatherMap.url}/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${weatherMap.forecastDays}&appid=${weatherMap.apiKey}`
    };
    return axios(configuration);
}

module.exports = {
    getLocation,
    getCurrentWeather,
    getForecast
};
