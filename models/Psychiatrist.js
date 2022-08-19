const mongoose = require('mongoose');

const PsychiatristSchema = new mongoose.Schema({
    Psychiatrist_name : {
        type : String,
        required : true,
    },
    patients : {
        type : [{
                type : mongoose.Types.ObjectId,
                ref : "Patient"
            }]
    },
    password : {
        type : String,
        required : true
    },
    Hospital : {
        type : mongoose.Types.ObjectId,
        ref : "Hospital"
    }
}, { timestamps : true });

module.exports =  mongoose.model('Psychiatrist', PsychiatristSchema)