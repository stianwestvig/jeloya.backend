"use strict";

//require('babel/register')({
//    stage: 0
//});

(function() {

    var express = require("express");
    var http = require("http");
    var crypto = require("crypto");

    var PORT = process.env.PORT || 3000;

    var app = exports.app = express();
    var allowCrossDomain = function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    };
    app.use(allowCrossDomain);

    // body parser - to get parameters from post request:
        /*app.use(bodyParser.urlencoded({
         extended: true
         }));*/

    // ---- Routes ----
    var routes = require("./routes");
    new routes().configure(app);

    var server = http.createServer(app);
    // start
    server.listen(PORT, function () {
        var serverAddress = server.address().address === "0.0.0.0" ? "localhost" : server.address().address;
        console.log("Server listening on: http://%s:%s", serverAddress, server.address().port);
    });
})();

