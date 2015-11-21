"use strict";

//require('babel/register')({
//    stage: 0
//});

var express = require("express");
var http = require("http");
var moment = require("moment");
var crypto = require("crypto");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var PORT = process.env.PORT || 3000;

var app = exports.app = express();
var server = http.createServer(app);
var path = require("path");

var parkings = [];
var pricePerSecond = 1;
var customers = [];

var findCurrentParking = function (user) {
    for (var i = 0; i < parkings.length; i++) {
        if (parkings[i].user === user && !isEndedParking(parkings[i])) {
            return parkings[i];
        }
    }
};

var isEndedParking = function (parking) {
    return typeof(parking.end) !== "undefined";
}

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(allowCrossDomain);

var generateGuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = crypto.randomBytes(1)[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
};

// body parser - to get parameters from post request:
/*app.use(bodyParser.urlencoded({
 extended: true
 }));*/

// ---- Routes ----

app.post("/api/register", jsonParser, function (req, res) {
    console.log("POST /api/register. Body: ", req.body);
    if (!req.body) {
        var missingBody = {"error": "missing body"};
        console.log("Response: ", missingBody);
        return res.status(400).send(missingBody);
    }
    var guid = generateGuid();
    console.log("Guid is: ", guid);

    var newCustomer = {name: req.body.name, email: req.body.email, id: guid};
    customers.push(newCustomer)
    console.log("Response: ", newCustomer);
    return res.status(200).send(newCustomer);
});

app.get("/api/price", jsonParser, function (req, res) {
    console.log("GET /api/price");
    console.log("Response: ", pricePerSecond);
    return res.status(200).send({price: pricePerSecond});
});

app.post("/api/price", jsonParser, function (req, res) {
    console.log("POST /api/price. Body: ", req.body);
    if (!req.body) {
        var missingBody = {"error": "missing body"};
        console.log("Response: ", missingBody);
        return res.status(400).send(missingBody);
    }

    pricePerSecond = req.body.price;
    console.log("Response: ", pricePerSecond);
    return res.status(200).send({price: pricePerSecond});
});

app.get("/api/parkings", jsonParser, function (req, res) {
    console.log("GET /api/parkings");
    console.log("Response: ", JSON.stringify(parkings));
    return res.status(200).send(parkings);
});

app.post("/api/park", jsonParser, function (req, res) {
    console.log("POST /api/park. Body: ", req.body);
    if (!req.body) {
        var missingBody = {"error": "missing body"};
        console.log("Response: ", missingBody);
        return res.status(400).send(missingBody);
    }

    var currentParking = findCurrentParking(req.body.user);
    if (currentParking) {
        var alreadyParked = {"error": "already parked"};
        console.log("Response: ", alreadyParked);
        return res.status(400).send(alreadyParked);
    }

    var parking = {
        user: req.body.user,
        start: moment()
    };

    parkings.push(parking);
    console.log("Response: ", JSON.stringify(parking));
    return res.status(200).send(parking);
});

app.post("/api/endpark", jsonParser, function (req, res) {
    console.log("POST /api/endpark. Body: ", req.body);
    if (!req.body) {
        var missingBody = {"error": "missing body"};
        console.log("Response: ", missingBody);
        return res.status(400).send(missingBody);
    }

    var currentParking = findCurrentParking(req.body.user);

    if (!currentParking) {
        var notParked = {"error": "not parked"};
        console.log("Response: ", notParked);
        return res.status(400).send(notParked);
    }

    var parking = currentParking;
    parking.end = moment();
    console.log("Response: ", JSON.stringify(parking));
    return res.status(200).json(parking);
});


// start 
server.listen(PORT, function () {
    var serverAddress = server.address().address === "0.0.0.0" ? "localhost" : server.address().address;
    console.log("Server listening on: http://%s:%s", serverAddress, server.address().port);
});
