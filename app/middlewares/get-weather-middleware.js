const { getWeatherController } = require('../controllers/get-weather-controller');

const getWeatherMiddleware = async (req, res, next) => {
    console.log('Getting actual weather');
    try {
        for (const location of res.data) {
            const { lat, lon } = location;
            try {
                const response = await getWeatherController(lat, lon);
                location.weather = response.data;
            } catch (error) {
                console.error(`Error trying getting actual weather for lat ${lat} and long ${lon} error: ${error.message}`);
                location.weather = null;
            }
        }
        next();
    } catch(error) {
        console.error(`Error getting actual weather ${error.message}`);
        res.status(400).send({message: 'Error getting actual weather'});
    }
};

module.exports = {
    getWeatherMiddleware
};
