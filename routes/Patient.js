const Router = require('express').Router();
const Hospital = require('../models/Hospital.js');
const Psychiatrist = require('../models/Psychiatrist.js');
const Patient = require('../models/Patient.js');
const Phone = require('../models/phone.js');

const RegisterPatient = async (req, res) => {
    try {
        const { Patient_name, email, country_code,
            phoneNumber, photo, PsychiatristID, password } = req.body;
        const result = await Psychiatrist.findById(PsychiatristID);
        if (!result || (password != result.password)) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        const phone = await Phone.create({
            phoneNumber, country_code
        });
        const NewPatient = await Patient.create({
            Patient_name, photo, email, phone, PsychiatristID
        });
        result.patients.push(NewPatient._id);
        await result.save();
        await Hospital.updateOne({ _id : result.Hospital }, {
            $inc : {
                patients_count : 1
            }
        })
        res.status(200).json({
            ...NewPatient,
            message: `new patient ${Patient_name} Created`
        });
    } catch (err) {
        res.status(400).json(err);
    }
}


Router.route('./create').post(RegisterPatient)

module.exports = Router;