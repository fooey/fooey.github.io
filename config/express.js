'use strict';
const path = require('path');

module.exports = function(express) {
	var app = express();


	/*
	*
	*	Views
	*
	*/
	app.set('views', path.normalize(path.join(process.cwd(), 'views')));
	app.set('view engine', 'jade');
	app.set('case sensitive', true);
	app.set('strict routing', true);
	app.engine('jade', require('jade').__express);



	/*
	*
	*	Middleware
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
	*	Statics
	*
	*/

	express.static.mime.define({
		'text/plain': [
			'jade',
			'map',
			'html',
		]
	});
	express.static.mime.define({
		'text/css': [
			'less',
		]
	});


	const serveStatic = require('serve-static');

	var staticOptions = {
		dotfiles: 'deny',
		etag: true,
		// index: false,
		maxAge: '1d',
		// redirect: true,
	};

	app.use(serveStatic('public', staticOptions));
	app.use('/nm', serveStatic(process.cwd() + '/node_modules', staticOptions));
	app.use('/fonts', serveStatic(process.cwd() + '/node_modules/font-awesome/fonts', staticOptions));
	app.use('/routes', serveStatic(process.cwd() + '/routes', staticOptions));
	app.use('/views', serveStatic(process.cwd() + '/views', staticOptions));





	return app;
}



