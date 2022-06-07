
/* 
 *  Shrinks an array by removing items from the start until it is the parameter length.
 */
const shrinkArray = (array, shrinkTo) => {
    return array.slice(-shrinkTo);
};

module.exports = shrinkArray;