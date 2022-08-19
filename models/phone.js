const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
    country_code : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
}, { timestamps : true });

module.exports =  mongoose.model('Phone', PhoneSchema);
