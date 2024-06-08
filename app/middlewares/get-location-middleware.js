const { getLocationController } = require('../controllers/get-location-controller');

const getLocationMiddleware = async (req, res, next) => {
    const location = req.params.city;
    try {
        console.log('Getting location');
        if(location) {
            res.data.city = location;
        } else {
            const response = await getLocationController();
            res.data.city = response.city;
        }
        return next();
    } catch (error) {
        console.log(`Getting location Error: ${error.message}`);
        res.status(400).send({message: 'Error getting location'});
    }
};

module.exports = {
    getLocationMiddleware
};
