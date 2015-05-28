'use strict';

// require('babel/register');


var appPort = process.env.PORT || 3000;
var appEnv = process.env.NODE_ENV || 'production';


var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');




var serve = serveStatic('./');

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res);
  serve(req, res, done);
});

// Listen
server.listen(appPort);


console.log('');
console.log('**************************************************');
console.log('Server started');
console.log('Node service starting');
console.log('Port:     %d', appPort);
console.log('Mode:     %s', appEnv);
console.log('PID:      %s', process.pid);
console.log('Platform: %s', process.platform);
console.log('Arch:     %s', process.arch);
console.log('Node:     %s', process.versions.node);
console.log('V8:       %s', process.versions.v8);
console.log('**************************************************');
console.log('');