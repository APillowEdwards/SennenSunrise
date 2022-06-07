const axios = require('axios');

const JSON_API_URI = 'https://api.sunrise-sunset.org/json';

const getInfoByLatLong = async ({lat, long}) => {
    const result = await axios.get(`${JSON_API_URI}?lat=${lat}&lng=${long}`);
    return result.data;
}

module.exports = {
    getInfoByLatLong,
};