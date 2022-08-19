const Router = require('express').Router();
const Hospital = require('../models/Hospital.js')
const Psychiatrist = require('../models/Psychiatrist.js')
const Encrypt = require('../constant/encrypt.js')

const RegisterPsychiatrist = async (req, res) => {
    try {
        const {HospitalID, Psychiatrist_name, password} = req.body;
        const Newpsychiatrist = await Psychiatrist.create({
            HospitalID, Psychiatrist_name,
            password : Encrypt(password)
        });
        await Hospital.updateOne({_id : HospitalID}, {
            $addToSet : {
                Psychiatrists : Newpsychiatrist._id
            }
        })
        res.status(200).json({
            ...Newpsychiatrist._doc,
            message : "New psychiatrist created"
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

const ChangeHospital = async (req, res) => {
    try {
        const { HospitalID, psychiatristID } = req.params;
        console.log(req.params);
        const psychiatrist = await Psychiatrist.findById(psychiatristID);
        await Hospital.updateOne({_id : psychiatrist.HospitalID}, {
            $pull : {
                Psychiatrists : psychiatristID
            },
            $inc : {
                patients_count : -psychiatrist.patients.length
            }
        });
        await Hospital.updateOne({_id : HospitalID}, {
            $addToSet : {
                Psychiatrists : psychiatristID
            },
            $inc : {
                patients_count : psychiatrist.patients.length
            }
        });
        psychiatrist.HospitalID = HospitalID;
        await psychiatrist.save();
        res.status(200).json({
            ...psychiatrist._doc,
            message : "Hospital changed"
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

Router.route('/ragister').post(RegisterPsychiatrist);
Router.route('/changeHospital/:HospitalID/:psychiatristID')
    .patch(ChangeHospital)

module.exports = Router;