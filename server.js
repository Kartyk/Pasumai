const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const createUser = new require('./controller/register');

let user = new createUser()

mongoose.connect('mongodb://localhost/pasumai');

var db = mongoose.connection;

db.once('open', function () {
    console.log("connection made")
});

const app = express();

var enableCORS = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Date, X-Date');
    return next();
};

app.use(enableCORS);

var jsonParser = bodyParser.json({limit: 1024 * 1024 * 20, type: 'application/json'});

var urlencodedParser = bodyParser.urlencoded({
    extended: true,
    limit: 1024 * 1024 * 20,
    type: 'application/x-www-form-urlencoding'
});

app.use(jsonParser);

app.use(urlencodedParser);

app.post('/pasumaiThakkam/api/createUser', user.registerUser);

app.post('/showData', user.showUser);

let port = 4000;

app.listen(port, () => console.log(`The server is running at ${port}`));