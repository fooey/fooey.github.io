'use strict';

const path = require('path');


module.exports = function(app, express) {


    app.get.apply(app, getRedirectRoute('/index.html', '/'));
    app.get.apply(app, getRedirectRoute('/default', '/'));
    app.get.apply(app, getRedirectRoute('/index', '/'));

    app.get('/', function(req, res) {
        res.sendFile(path.resolve('./public/index.html'));
    });


    app.get.apply(app, getRedirectRoute('/Overview', '/overview'));
    app.get.apply(app, getRedirectRoute('/overview', '/overview'));

    app.get('/overview', function(req, res) {
        res.sendFile(path.resolve('./public/overview.html'));
    });


    app.get.apply(app, getRedirectRoute('/Knowledge', '/knowledge'));
    app.get.apply(app, getRedirectRoute('/knowledge', '/knowledge'));

    app.get('/knowledge', function(req, res) {
        res.sendFile(path.resolve('./public/knowledge.html'));
    });


    app.get.apply(app, getRedirectRoute('/Projects', '/projects'));
    app.get.apply(app, getRedirectRoute('/projects', '/projects'));

    app.get('/projects', function(req, res) {
        res.sendFile(path.resolve('./public/projects.html'));
    });




    require('./middleware.js')(app, express);
    require('./statics.js')(app, express);

    return app;
};



function redirectTo(to, req, res) {
    res.redirect(301, to);
}



function getRedirectRoute(fromBase, toUrl) {
    let app = this;
    const extensions = [
      'htm',
      'html',
      'cfm',
    ];


    // if from===to, extension is required, would cause infinite redirect
    const route = (fromBase === toUrl)
      ? fromBase + '.:ext(' + extensions.join('|') + ')'
      : fromBase + '.:ext(' + extensions.join('|') + ')?';


    return [
      route,
      redirectTo.bind(app, toUrl),
    ];
}