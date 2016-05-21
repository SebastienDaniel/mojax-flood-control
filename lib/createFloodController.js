"use strict";

var generateControllers = require("./generateControllers"),
    compileDelays = require("./compileDelays"),
    continueRequest = require("./continueRequest");

/**
 * @alias "mojax-flood-control"
 * @function
 * @public
 * @summary compiles the parts to create a flood controller function
 *
 * @param {object} delays - the delays, in milliseconds, for GET, POST, PUT, DELETE operations
 *
 * @returns {function} allowQuery test function, based on past requests
 */
module.exports = function createFloodController(delays) {
    var controllers = generateControllers();

    delays = compileDelays(delays);

    // return partially applied flood control test function
    return function allowQuery(params) {
        return continueRequest(controllers, delays, params) ? params : undefined;
    };
};
