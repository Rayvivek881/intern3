const Router = require('express').Router();
const Hospital = require('../models/Hospital.js')
const Psychiatrist = require('../models/Psychiatrist.js')
const Encrypt = require('../constant/encrypt.js')

const RegisterPsychiatrist = async (req, res) => {
    try {
        const {HospitalId, Psychiatrist_name, password} = req.body;
        const Newpsychiatrist = await Psychiatrist.create({
            HospitalId, Psychiatrist_name,
            password : Encrypt(password)
        });
        await Hospital.updateOne({_id : HospitalId}, {
            $addToSet : {
                Psychiatrists : Newpsychiatrist._id
            }
        })
        res.status(200).json({
            ...Newpsychiatrist,
            message : "New psychiatrist created"
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

const ChangeHospital = async (req, res) => {
    try {
        const { HospitalId, psychiatristId } = req.params;
        const psychiatrist = await Psychiatrist.findById(psychiatristId);
        await Hospital.updateOne({_id : psychiatrist.Hospital}, {
            $pull : {
                Psychiatrists : psychiatristId
            },
            $inc : {
                patients_count : -psychiatrist.patients.length
            }
        });
        await Hospital.updateOne({_id : HospitalId}, {
            $addToSet : {
                Psychiatrists : psychiatristId
            },
            $inc : {
                patients_count : psychiatrist.patients.length
            }
        });
        psychiatrist.Hospital = HospitalId;
        await psychiatrist.save();
        res.status(200).json({
            ...psychiatrist,
            message : "Hospital changed"
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

Router.route('/ragister').post(RegisterPsychiatrist);
Router.route('/changeHospital/:HospitalId/:psychiatristId')
    .patch(ChangeHospital)

module.exports = Router;