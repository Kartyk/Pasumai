const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    aadhaar: String,
    age: String,
    accountNumber: String,
    bankName: String,
    branchName: String,
    district: String,
    door: String,
    dob: String,
    device_id: String,
    email: String,
    fatherName: String,
    formStatus: String,
    gender: String,
    imageUrl: String,
    imageUrlType: String,
    isLand: String,
    IFSCCode: String,
    locality: String,
    mobile: String,
    marital_status: String,
    profession: String,
    pinCode: String,
    password: String,
    street: String,
    state: String,
    taluk: String,
    userName: String,
    verification_code: String,
    createDate: String,
    lastUpdated: String,
    verified: {
        type: Number,
        default: 0
    },
    landDetails: [{
        imagePattaUrl: String,
        imageLocationUrl: String,
        landType: String,
        pattaNumber: String,
        surveyNumber: String,
    }]
});

module.exports = mongoose.model('users', UsersSchema);