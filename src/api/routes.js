var Configurer = function () {
    var moment = require("moment");
    var crypto = require("crypto");

    var bodyParser = require("body-parser");
    var jsonParser = bodyParser.json();

    var parkings = [];
    var registeredUsers = [];
    var pricePerSecond = 1;

    var findCurrentParking = function (userid) {
        for (var i = 0; i < parkings.length; i++) {
            if (parkings[i].id === userid && !isParkingEnded(parkings[i])) {
                return parkings[i];
            }
        }
    };
    
    var findUser = function (userid) {
        for (var i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].id === userid) {
                return registeredUsers[i];
            }
        }
    };

    var isParkingEnded = function (parking) {
        return typeof(parking.end) !== "undefined";
    }

    var generateGuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = crypto.randomBytes(1)[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    };

    var configure = function(app) {
        app.post("/api/register", jsonParser, function (req, res) {
            console.log("POST /api/register. Body: ", req.body);
            if (!req.body) {
                var missingBody = {"error": "missing body"};
                console.log("Response: ", missingBody);
                return res.status(400).send(missingBody);
            }

            var guid = generateGuid();
            var newCustomer = {name: req.body.name, email: req.body.email, id: guid};
            registeredUsers.push(newCustomer)
            console.log("Response: ", newCustomer);
            return res.status(200).send(newCustomer);
        });

        app.get("/api/registered", jsonParser, function (req, res) {
            console.log("GET /api/registered");

            console.log("Response: ", registeredUsers);
            return res.status(200).send(registeredUsers);
        });

        app.get("/api/username", jsonParser, function (req, res) {
            console.log("GET /api/username");
            console.log("GET /api/username. Query: ", req.query);
            if (!req.query) {
                var missingQuery = {"error": "missing query string"};
                console.log("Response: ", missingQuery);
                return res.status(400).send(missingQuery);
            }

            var user = findUser(req.query.id);
            if (!user) {
                var userNotFound = {"error": "user not found"};
                console.log("Response: ", userNotFound);
                return res.status(400).send(userNotFound);
            }

            console.log("Response: ", user);
            return res.status(200).send(user);
        })
        
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

            var currentParking = findCurrentParking(req.body.id);
            if (currentParking) {
                var alreadyParked = {"error": "already parked"};
                console.log("Response: ", alreadyParked);
                return res.status(400).send(alreadyParked);
            }

            var parking = {
                id: req.body.id,
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

            var currentParking = findCurrentParking(req.body.id);

            if (!currentParking) {
                var notParked = {"error": "not parked"};
                console.log("Response: ", notParked);
                return res.status(400).send(notParked);
            }

            var parking = currentParking;

            parking.end = moment();

            var parkTimeInSeconds = moment.duration(parking.end.diff(parking.start))/1000;
            parking.price = Math.round(parkTimeInSeconds * pricePerSecond);

            console.log("Response: ", JSON.stringify(parking));
            return res.status(200).json(parking);
        });
    };
    return {
        configure: configure
    }
}

module.exports = Configurer;