const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    hospital_name : {
        type : String,
        required : true
    },
    Psychiatrists : {
        type : [{
            type : mongoose.Types.ObjectId,
            ref : 'Psychiatrist'
        }]
    },
    patients_count : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

module.exports =  mongoose.model('Hospital', HospitalSchema)