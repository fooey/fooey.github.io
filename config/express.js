"use strict";

module.exports = function(express) {
    var app = express();

    app.locals.startTime = Date.now();



    /*
    *
    * config
    *
    */

    app.enable('case sensitive routing');
    app.enable('strict routing');


    /*
    *
    * Views
    *
    */

    app.set('views', './views');
    app.set('view engine', 'jade');
    app.engine('jade', require('jade').__express);



    /*
    *
    * Middleware
    *
    */

    const morgan = require('morgan');
    const compression = require('compression');


    if (process.env.NODE_ENV === 'development') {
        const errorhandler = require('errorhandler');

        app.use(errorhandler());
        app.use(morgan('dev'));
        app.set('view cache', false);
    }
    else {
        app.use(morgan('combined'));
        app.set('view cache', true);
    }
    app.use(compression());



    /*
    *
    * Mime Types
    *
    */

    express.static.mime.define({
        'text/plain': [
            'jade',
            'map',
            'htm',
        ]
    });
    express.static.mime.define({
        'text/css': [
            'less',
        ]
    });


    return app;
}
