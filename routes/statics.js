'use strict';

module.exports = function(app) {
    const serveStatic = require('serve-static');
    const staticOptions = {
        dotfiles: 'deny',
        etag: true,
        // index: false,
        maxAge: '1d',
        // redirect: true,
    };


    app.use(serveStatic('public', staticOptions));
    // app.use('/nm', serveStatic('node_modules', staticOptions));
    app.use('/routes', serveStatic('routes', staticOptions));
    app.use('/views', serveStatic('views', staticOptions));

    app.use('/favicon.ico', serveStatic('public/img/curlies.png', staticOptions));
    app.use('/welcome.jpg', serveStatic('public/img/JasonRushton-squared-240.jpg', staticOptions));

    return app;
};
