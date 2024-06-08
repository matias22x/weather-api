const axios = require('axios');
const { ipApiUrl } = require('../config/config');

const getLocation = () => {
    console.log(`Getting Location`);
    const configuration = {
        method: 'get',
        url: `${ipApiUrl}`
    };
    return axios(configuration);
}

module.exports = {
    getLocation
};
