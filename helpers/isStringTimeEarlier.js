const getStringAsTime = require("./getStringAsTime");


const isStringTimeEarlier = (stringTime1, stringTime2) => (
    getStringAsTime(stringTime1).isBefore(getStringAsTime(stringTime2))
);

module.exports = isStringTimeEarlier;