'use strict';

var express = require('express');
var http = require('http');
var moment = require('moment');

var PORT = process.env.PORT || 4000;

var app = exports.app = express();
var server = http.createServer(app);
var path = require('path');

app.use('/public', express.static(__dirname + '/public'));

// ---- Routes ----
app.get('/', function(req, res) {
    res.send('<html><head><link rel="stylesheet" href="public/styles.css" /></head><body>' +
    '<h1>I live!</h1><script src="public/app.js"></script>' +
    '</body></html>')
});


// start server
server.listen(PORT, function () {
    var serverAddress = server.address().address === '0.0.0.0' ? 'localhost' : server.address().address;
    console.log('Server listening on: http://%s:%s', serverAddress, server.address().port);
});
