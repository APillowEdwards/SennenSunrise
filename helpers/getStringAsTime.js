const moment = require('moment');

const API_TIME_FORMAT = 'hh:mm:ss A';

const getStringAsTime = (time) => moment(time, API_TIME_FORMAT);

module.exports = getStringAsTime;