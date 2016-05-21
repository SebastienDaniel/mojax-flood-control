var defaultConfig = {
    GET: 250,
    PUT: 250,
    POST: 250,
    DELETE: Infinity
};

/**
 * @alias compileDelays
 * @function
 * @private
 * @summary compiles the final delay values based on those provided,
 * falling back to the default delays
 * 
 * @param {object} delays - delays to apply based on request type
 * @param {number} [delays.GET=250] - get request delay in milliseconds
 * @param {number} [delays.POST=250] - POST request delay in milliseconds
 * @param {number} [delays.PUT=250] - PUT request delay in milliseconds
 * @param {number} [delays.DELETE=Infinity] - DELETE request delay in milliseconds
 *
 * @returns {{GET: number, PUT: number, POST: number, DELETE: Number}}
 */
module.exports = function compileDelays(delays) {
    "use strict";
    // finalize the delay values
    return delays ? Object.keys(defaultConfig).reduce(function(obj, key) {
        obj[key] = typeof delays[key] === "number" ? delays[key] : defaultConfig[key];
        return obj;
    }, {}) : defaultConfig;
};
