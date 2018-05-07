const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
        aadhaar: String,
        userName: String,
        email: String,
        password: String,
        mobile: String,
        image: String,   
        imageUrl: String,   
        fatherName: String,
        dob: String,
        gender: String,
        age: String,
        marital_status: String,
        profession: String,
        verification_code: String,
        verified: {type: Number, default: 0},
        door: String,
        street: String,
        state: String,  
        district: String,
        taluk: String,
        device_id: String,
        pinCode: String,
        bankName:String,
        accountNumber:String,
        IFSCCode: String,
        createDate:String,
        lastUpdated:String,
        landDetails:[{
            pattaNumber: String,
            surveyNumber: String,
            imagePattaUrl:String,
            imagePatta:String,
            imageLocationUrl: String,
            imageLocation:String,
            landType:String            
        }]
 });

module.exports = mongoose.model('users', UsersSchema);
