const { andThen, pipe } = require('ramda');

const sunriseLogic = require('./logic/sunriseLogic');

const NUMBER_OF_POINTS = 100;

const outputData = (data) => {
    console.log(`The earliest of the ${NUMBER_OF_POINTS} sunrises was at ${data.sunrise}, and the day lasted for ${data.day_length}!`);
};

// For some reason a lot of the fetched data is valid, but both the sunset and sunrise times are either '12:00:00 AM' or '12:00:01 AM' 
// I couldn't find any documentation on why this is, looking up one such point put it in Antarctica which means the lat/long is valid.
// Perhaps this means that the sun didn't rise there today, in which case this could be filtered out in future.
const getEarliestSunriseFromRandomPoints = pipe(
    sunriseLogic.getRandomPoints,
    andThen(sunriseLogic.getEarliestSunrise),
    andThen(outputData),
);

getEarliestSunriseFromRandomPoints(NUMBER_OF_POINTS);