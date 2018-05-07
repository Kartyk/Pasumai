const user = require('../model/register');
const fs = require("fs");
const crypto = require('crypto');

const _ = require('lodash');
// var nodemailer = require('nodemailer');
// var jwt = require('jsonwebtoken');

// var randomstring = require("randomstring");
// var random = randomstring.generate({
//     length: 6,
//     charset: 'alphanumeric',
//     capitalization: 'uppercase'
// });


// var transporter = nodemailer.createTransport("SMTP", {
//     service: 'gmail',
//     debug: true,
//     auth: {
//         user: '',
//         pass: ''
//     }
// });




function register(req, res) {

}

register.prototype.registerUser = async (req, res) => {
    let getMobileNo = _.map(req.body.data, 'mobile')
    console.log("mobileee", getMobileNo)
    let findMobileExist = await user.find({
        mobile: {
            $in: getMobileNo
        }
    })
    console.log("resulttt", findMobileExist)
    res.send({
        status: 0,
        msg: "Failure"
    })
    if (findMobileExist) {
        // res.send({status:0,msg:"Failure"})
    } else {
        let findMobileExist = await user.findOne({
            mobile: req.body.mobile
        })
    }

}


module.exports = register