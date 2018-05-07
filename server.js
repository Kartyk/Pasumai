const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const createUser = new require('./controller/register');
let user = new createUser()
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.once('open', function () {
    // we're connected!
    console.log("connection made")
});

const app = express();
app.use(bodyParser.json())

app.post('/registerUser', user.registerUser)
let port = 8000;
app.listen(port, () => console.log(`The server is running at ${port}`))