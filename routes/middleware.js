'use strict';

module.exports = function(app) {

    /*
    * NO TRAILING SLASHES
    */

    app.use(function(req, res, next) {
        if (req.url.substr(-1) === '/' && req.url.length > 1) {
            res.redirect(301, req.url.slice(0, -1));
        }
        else {
            next();
        }
    });

    return app;
};
