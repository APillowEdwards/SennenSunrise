// If there are more helper methods needed for handling string time, then consider
// consolidating them into a single logic module.

const getStringAsTime = require("./getStringAsTime");

const isStringTimeEarlier = (stringTime1, stringTime2) => (
    getStringAsTime(stringTime1).isBefore(getStringAsTime(stringTime2))
);

module.exports = isStringTimeEarlier;