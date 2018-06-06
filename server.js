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

app.use(bodyParser.json());

app.post('/pasumaiThakkam/api/createUser', user.registerUser);

app.post('/showData', user.showUser);

let port = 4000;

app.listen(port, () => console.log(`The server is running at ${port}`));