const mongoose = require('mongoose');

const PatientsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : mongoose.Types.ObjectId,
        ref : "phone"
    },
    Psychiatrist : {
        type : mongoose.Types.ObjectId,
        ref  : "Psychiatrist"
    },
    photo : {
        type : String,
        default : "#" 
    }
}, {timestamps: true});

module.exports =  mongoose.model('Patient', PatientsSchema)