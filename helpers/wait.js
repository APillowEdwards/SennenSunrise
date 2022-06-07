const { curry } = require("ramda");

/* 
 * This function returns a promise that resolves itself after {waitTime} ms.
 * Useful for adding delay between requests
 */
const wait = curry((waitTime) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => resolve(), waitTime);
    })
});

module.exports = wait;