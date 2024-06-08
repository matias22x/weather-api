const { getLocationFromIpApiController, getLocationFromWeatherMapController } = require('../controllers/get-location-controller');

const getLocationMiddleware = async (req, res, next) => {
    const location = req.params.city;
    const limit = req.query.limit || 1;
    try {
        console.log('Getting location');
        let response;
        if(location) {
            res.data.city = location;
            response = await getLocationFromWeatherMapController(location, limit);
            res.data = response.data.map((city) => {
                return {
                    city: city.name,
                    lat: city.lat,
                    lon: city.lon,
                    region: city.state,
                    country: city.country
                }
            });
        } else {
            response = await getLocationFromIpApiController();
            res.data.push({
                city: response.data.city,
                lat: response.data.lat,
                lon: response.data.lon,
                region: response.data.regionName,
                country: response.data.country
            });
        }
        return next();
    } catch (error) {
        console.error(`Getting location Error: ${error.message}`);
        res.status(400).send({message: 'Error getting location'});
    }
};

module.exports = {
    getLocationMiddleware
};
