var Dictionary = require("sebastiendaniel-adt/dictionary"),
    canQuery = require("./canQuery");

/**
 * @alis generateControllers
 * @function
 * @private
 * @summary Compiles a controller map, each controller is a Dictionary
 * extended with the canQuery method
 * 
 * @returns {object}
 */
module.exports = function generateControllers() {
    "use strict";

    var controllers = {
        GET: new Dictionary(),
        POST: new Dictionary(),
        PUT: new Dictionary(),
        DELETE: new Dictionary()
    };

    // extend all dictionaries to have a self-assessment method
    // based on floodControllers' needs
    Object.keys(controllers).forEach(function(key) {
        controllers[key].canQuery = canQuery;
    });

    return controllers;
};
