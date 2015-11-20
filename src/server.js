'use strict';

require('babel/register')({
    stage: 0
});

var express = require('express');
var http = require('http');
//var bodyParser = require('body-parser');


var PORT = process.env.PORT || 3000;

var app = exports.app = express();
var server = http.createServer(app);
var path = require('path');

// Templates
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// Make pretty HTML:
//app.locals.pretty = true;

// body parser - to get parameters from post request:
/*app.use(bodyParser.urlencoded({
 extended: true
 }));*/

// ---- Routes ----
app.get('/', function(req, res){
    return {
        data: {}
    }
});


// start server
server.listen(PORT, function () {
    var serverAddress = server.address().address === '0.0.0.0' ? 'localhost' : server.address().address;
    console.log('Server listening on: http://%s:%s', serverAddress, server.address().port);
});
