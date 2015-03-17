'use strict';

require("babel/register");

const requiredEnvironmentVariables = [
	'PORT',
	'NODE_ENV',		// development or production
	'NODE_PATH',	// './'
];
requiredEnvironmentVariables.forEach((envKey) => {
	if (!process.env.hasOwnProperty(envKey)) {
		throw ('Required environment variable not set: ' + envKey);
	}
});


GLOBAL.appStartTime = Date.now();


let express = require('express');
let app = require('./config/express')(express);

require('./routes')(app, express);


app.listen(process.env.PORT, function() {
	console.log('');
	console.log('**************************************************');
	console.log('%d Express server started', GLOBAL.appStartTime);
	console.log('%d Port: %d', GLOBAL.appStartTime, process.env.PORT);
	console.log('%d Mode: %s', GLOBAL.appStartTime, process.env.NODE_ENV);
	console.log('**************************************************');
	console.log('');
});
