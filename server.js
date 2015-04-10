"use strict";

const appPort = process.env.PORT || 3000;
const appEnv = process.env.NODE_ENV || 'production';

if (appEnv !== 'development') {
  require('newrelic');
}


require("babel/register");


GLOBAL.appStartTime = Date.now();


let express = require('express');
let app = require('./config/express')(express);

require('./routes')(app, express);



app.listen(appPort, function() {
  console.log('');
  console.log('**************************************************');
  console.log('Express server started');
  console.log('Time: %d',     GLOBAL.appStartTime);
  console.log('Port: %d',     appPort);
  console.log('Mode: %s',     appEnv);
  console.log('PID: %s',      process.pid);
  console.log('Platform: %s', process.platform);
  console.log('Arch: %s',     process.arch);
  console.log('Node: %s',     process.versions.node);
  console.log('V8: %s',       process.versions.v8);
  console.log('**************************************************');
  console.log('');
});
