module.exports = {
    port: process.env.NODE_PORT || 3000,
    ipApiUrl: process.env.IP_API_URL || 'http://ip-api.com/json/',
    weatherMap: {
        url: process.env.WEATHER_MAP_URL || 'https://api.openweathermap.org',
        apiKey: process.env.WEATHER_MAP_API_KEY,
        forecastDays: process.env.forecastDays || 5
    }
}