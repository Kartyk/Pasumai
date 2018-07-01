const user = require('../model/register');

const fs = require("fs");

const _ = require('lodash');

function register(req, res) {

}

register.prototype.registerUser = async (req, res) => {

    try {

        console.log("REQUEST DATA >>>>>>>>>>>>>>>>>>> ", JSON.stringify(req.body.data));

        let getMobileNo = _.map(req.body.data, 'mobile');

        console.log("MOBILE NUMBER >>>>>>>>>>>>>>>>>>> ", getMobileNo);

        let findMobileExist = await user.find({
            mobile: {
                $in: getMobileNo
            }
        });

        console.log("CHECK MOBILE EXISTS >>>>>>>>>>>>>>>>>>> ", findMobileExist.length);

        console.log("CHECK MOBILE EXISTS >>>>>>>>>>>>>>>>>>> ", JSON.stringify(findMobileExist));

        var actualData;

        if (findMobileExist.length >= 0) {

            for (let i = 0; i < findMobileExist.length; i++) {

                findMobileExist[i].syncStatus = "2";
            }

            actualData = _.differenceBy(req.body.data, findMobileExist, 'mobile');

            console.log("ACTUAL DATA LENGTH >>>>>>>>>>>>>>>>>>> ", actualData.length);

            for (let i = 0; i < actualData.length; i++) {

                actualData[i].syncStatus = "1";

                findMobileExist.push(actualData[i]);
            }
        }

        console.log("ACTUAL DATA >>>>>>>>>>>>>>>>>>> ", actualData);

        let result = await user.insertMany(actualData);

        res.send({
            status: 1,
            data: {
                "userList": findMobileExist
            },
            message: "success"
        });

    } catch (error) {

        console.log("INSERT ERROR >>>>>>>>>>>>>>>>>>> ", error);

        res.send({
            status: 0,
            data: 'Server error',
            message: "failure"
        });
    }
}

module.exports = register;