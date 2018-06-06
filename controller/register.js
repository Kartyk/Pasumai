const user = require('../model/register');

const fs = require("fs");

const crypto = require('crypto');

const _ = require('lodash');

const uuidv5 = require('uuid/v5');

let fileWrite = async (url, image) => {

    try {

        let storeFile = await fs.writeFile(url, image, {
            encoding: 'base64'
        });

        return storeFile;

    } catch (err) {

        console.log("IMAGE WRITING ERROR >>>>>>>>>>>>>>> ", err)
    }
}

function register(req, res) {

}

register.prototype.registerUser = async (req, res) => {

    try {

        console.log("DATA", req.body.data);

        let getMobileNo = _.map(req.body.data, 'mobile');

        console.log("MOBILE NUMBER", getMobileNo);

        let findMobileExist = await user.find({
            mobile: {
                $in: getMobileNo
            }
        });

        console.log("CHECK MOBILE EXISTS", findMobileExist.length);

        var actualData;

        if (findMobileExist.length >= 0) {

            actualData = _.differenceBy(req.body.data, findMobileExist, 'mobile');

            console.log("ACTUAL DATA LENGTH", actualData.length);

            for (let i = 0; i < actualData.length; i++) {

                if (actualData[i].imageUrl) {

                    let url = `public/PasumaiThakkam/User/${actualData[i].imageProfileName}.png`;

                    let image = actualData[i].imageUrl;

                    let storeFile = fileWrite(url, image);

                    actualData[i].imageUrl = url;
                }

                var landDetails = actualData[i].landDetails;

                for (let j = 0; j < landDetails.length; j++) {

                    if (landDetails[j].imagePattaUrl) {

                        let url = `public/PasumaiThakkam/Patta/${landDetails[j].imagePattaName}.png`;

                        let image = landDetails[j].imagePattaUrl;

                        let storeFile = fileWrite(url, image);

                        actualData[i].landDetails[j].imagePattaUrl = url;
                    }

                    if (landDetails[j].imageLocationUrl) {

                        let image = landDetails[j].imageLocationUrl;

                        let url = `public/PasumaiThakkam/Location/${landDetails[j].imageLocationName}.png`;

                        let storeFile = fileWrite(url, image);

                        actualData[i].landDetails[j].imageLocationUrl = url;
                    }
                }
            }
        }

        console.log("ACTUAL DATA>>>>>>>>>> ", actualData);

        let result = await user.insertMany(actualData);

        res.send({
            status: 1,
            data: findMobileExist
        });

    } catch (err) {

        console.log("INSERT ERROR", err);

        res.send({
            status: 0,
            data: 'Server error'
        });
    }
}

register.prototype.showUser = (req, res) => {

    var base64Image = req.body.data.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile('image.png', base64Image, {
        encoding: 'base64'
    }, function (err) {

        console.log('FILE CREATED');

        res.send(base64Image);
    });
}

module.exports = register;