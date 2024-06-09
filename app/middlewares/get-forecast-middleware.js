const { getForecastController } = require('../controllers/get-forecast-controller');

const getForecastMiddleware = async (req, res, next) => {
    console.log('Getting Forecast');
    try {
        for (const location of res.data) {
            const { lat, lon } = location;
            try {
                const response = await getForecastController(lat, lon);
                location.forecast = response.data.list.map((days) => days);
            } catch (error) {
                console.error(`Error trying getting actual forecast for lat ${lat} and long ${lon} error: ${error.message}`);
                location.forecast = null;
            }
        }
        next();
    } catch(error) {
        console.error(`Error getting actual forecast ${error.message}`);
        res.status(400).send({message: 'Error getting actual forecast'});
    }
};

module.exports = {
    getForecastMiddleware
};
