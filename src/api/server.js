'use strict';

//require('babel/register')({
//    stage: 0
//});

var express = require('express');
var http = require('http');
var moment = require('moment');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var PORT = process.env.PORT || 3000;

var app = exports.app = express();
var server = http.createServer(app);
var path = require('path');

var parkings = [];

// body parser - to get parameters from post request:
/*app.use(bodyParser.urlencoded({
    extended: true
}));*/

// ---- Routes ----

app.get('/api/parked', jsonParser, function (req, res) {
    return res.status(200).send(parkings);
});

app.post('/api/park', jsonParser, function (req, res) {
    if (!req.body) return res.status(400).send({"error": "missing body"});
    console.log('got data:', req.body);
    var parking = {
        user: req.body.user,
        start: moment()
    };

    parkings.push(parking);
    return res.status(200).send(parking);
});

app.post('/api/endpark', jsonParser, function (req, res) {
    if (!req.body) return res.status(400).send({"error": "missing body"});
    var parking;
    for(var i = 0; i < parkings.length; i++) {
        if(parkings[i].user === req.body.user) {
            parking = parkings[i];
            break;
        }
    }

    if (typeof(parking) === 'undefined') {
        res.status(400);
    }

    parking.end = moment();
    return res.status(200).json(parking);
});


// start server
server.listen(PORT, function () {
    var serverAddress = server.address().address === '0.0.0.0' ? 'localhost' : server.address().address;
    console.log('Server listening on: http://%s:%s', serverAddress, server.address().port);
});
