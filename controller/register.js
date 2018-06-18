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

        // fs.writeFile(url, image, {
        //     encoding: 'base64'
        // }, function (err) {
        //     console.log("IMAGE WRITING ERROR >>>>>>>>>>>>>>> ", err)
        // });

        return storeFile;

    } catch (err) {

        console.log("IMAGE WRITING ERROR >>>>>>>>>>>>>>> ", err)
    }
}

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

        var actualData;

        if (findMobileExist.length >= 0) {

            actualData = _.differenceBy(req.body.data, findMobileExist, 'mobile');

            console.log("ACTUAL DATA LENGTH >>>>>>>>>>>>>>>>>>> ", actualData.length);

            for (let i = 0; i < actualData.length; i++) {

                if (actualData[i].imageUrl) {

                    var imgUrl = actualData[i].imageUrl;

                    var imageName = imgUrl.substring(imgUrl.lastIndexOf("/"));

                    let url = `public/PasumaiThakkam/User${imageName}`;

                    let image = actualData[i].imageData;

                    let storeFile = fileWrite(url, image);

                    actualData[i].imageUrl = url;

                    console.log("actualData[i].imageUrl ", actualData[i].imageUrl);
                }

                var landDetails = actualData[i].landArrayList;

                for (let j = 0; j < landDetails.length; j++) {

                    if (landDetails[j].imagePattaUrl) {

                        var pattaImgUrl = landDetails[j].imagePattaUrl;

                        var pattaImageName = pattaImgUrl.substring(pattaImgUrl.lastIndexOf("/"));

                        let url = `public/PasumaiThakkam/Patta${pattaImageName}`;

                        let image = landDetails[j].imagePattaData;

                        let storeFile = fileWrite(url, image);
            
                        actualData[i].landArrayList[j].imagePattaUrl = url;
                      
                    }

                    if (landDetails[j].imageLocationUrl) {

                        var locationImgUrl = landDetails[j].imageLocationUrl;

                        var locationImageName = locationImgUrl.substring(locationImgUrl.lastIndexOf("/"));

                        let image = landDetails[j].imageLocationData;

                        let url = `public/PasumaiThakkam/Location${locationImageName}`;

                        let storeFile = fileWrite(url, image);

                        actualData[i].landArrayList[j].imageLocationUrl = url;
                                                     
                    }
                }
            }
        }

        console.log("ACTUAL DATA >>>>>>>>>>>>>>>>>>> ", actualData);

        let result = await user.insertMany(actualData);

        res.send({
            status: 1,
            data: findMobileExist
        });

    } catch (err) {

        console.log("INSERT ERROR >>>>>>>>>>>>>>>>>>> ", err);

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