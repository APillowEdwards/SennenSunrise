const { pipe, andThen, times, multiply, tap, flatten, map, comparator, sort } = require('ramda');
const isStringTimeEarlier = require('../helpers/isStringTimeEarlier');
const shrinkArray = require('../helpers/shrinkArray');
const wait = require('../helpers/wait');

const sunriseService = require('../services/sunriseService');

const BATCH_SIZE = 5;
const REQUEST_BATCH_BUFFER = 2000;

const generateRandomFloat = (min, max) => {
    return min + (Math.random() * (max - min));
}

const generateRandomLatLong = () => {
    return {lat: generateRandomFloat(-90, 90), long: generateRandomFloat(-180, 180)};
};

const getRandomData = pipe(
    generateRandomLatLong,
    sunriseService.getInfoByLatLong,
);

const getRandomDataBatch = pipe(
    (batchSize) => times(getRandomData, batchSize),
    (ps) => Promise.all(ps),
);

const getRandomBatchWithDelay = pipe(
    multiply(REQUEST_BATCH_BUFFER),
    wait,
    andThen(() => getRandomDataBatch(BATCH_SIZE)),
    andThen(tap((data) => console.log(`Retrieved ${data.length} data points!`))),
);

// This method is a little wasteful, as it always does a multiple of BATCH_SIZE requests even if the parameter
// isn't a multiple of five
// e.g. if called with 4, then it will do five requests and ignore one.
const getRandomPoints = (numberOfPoints) => {
    return pipe(
        () => numberOfPoints,
        (n) => times(getRandomBatchWithDelay, Math.ceil(n / BATCH_SIZE)),
        (ps) => Promise.all(ps),
        andThen(flatten),
        andThen((array) => shrinkArray(array, numberOfPoints)),
        andThen(map((point) => point.results))
    )();
};

const earliestSunriseComparator = comparator((point1, point2) => isStringTimeEarlier(point1.sunrise, point2.sunrise));

const getEarliestSunrise = pipe(
    sort(earliestSunriseComparator),
    (data) => data[0],
);

module.exports = {
    getRandomPoints,
    getEarliestSunrise,
};