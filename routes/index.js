'use strict';


module.exports = function(app, express) {
    require('./middleware.js')(app, express);
    require('./statics.js')(app, express);


    app.get.apply(app, getRedirectRoute('/default', '/'));
    app.get.apply(app, getRedirectRoute('/index', '/'));

    app.get('/', (req, res) => {
        res.render('index', {
            metaTitle: 'Jason Rushton',
            metaDescription: '',
            req: req,
        });
        res.end();
    });




    app.get.apply(app, getRedirectRoute('/Overview', '/overview'));
    app.get.apply(app, getRedirectRoute('/overview', '/overview'));

    app.get('/overview', (req, res) => {
        res.render('overview', {
            metaTitle: 'Jason Rushton',
            metaDescription: '',
            canonical: '/#overview',
            req: req,
        });
        res.end();
    });



    app.get.apply(app, getRedirectRoute('/Knowledge', '/knowledge'));
    app.get.apply(app, getRedirectRoute('/knowledge', '/knowledge'));

    app.get('/knowledge', (req, res) => {
        res.render('knowledge', {
            metaTitle: 'Jason Rushton',
            metaDescription: '',
            canonical: '/#knowledge',
            req: req,
        });
        res.end();
    });



    app.get.apply(app, getRedirectRoute('/Projects', '/projects'));
    app.get.apply(app, getRedirectRoute('/projects', '/projects'));

    app.get('/projects', (req, res) => {
        res.render('projects', {
            metaTitle: 'Jason Rushton',
            metaDescription: '',
            canonical: '/#projects',
            req: req,
        });
        res.end();
    });



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