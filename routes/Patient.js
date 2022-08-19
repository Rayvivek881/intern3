const Router = require('express').Router();
const Hospital = require('../models/Hospital.js');
const Psychiatrist = require('../models/Psychiatrist.js');
const Patient = require('../models/Patient.js');
const Phone = require('../models/phone.js');
const {Encrypt, passwordCheck, EmailCheck} = require('../constant/encrypt.js')

const RegisterPatient = async (req, res) => {
    try {
        const { Patient_name, email, country_code, Address,
            phoneNumber, photo, PsychiatristID, password } = req.body;
        const result = await Psychiatrist.findById(PsychiatristID);
        console.log(req.body);
        if (!result || (Encrypt(password) != result.password) || phoneNumber.length < 10 || Address.length < 10) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        const phone = await Phone.create({
            phoneNumber, country_code
        });
        const NewPatient = await Patient.create({
            Patient_name, photo, email, phone, PsychiatristID, Address
        });
        result.patients.push(NewPatient._id);
        await result.save();
        await Hospital.updateOne({ _id: result.HospitalID }, {
            $inc: {
                patients_count: 1
            }
        })
        res.status(200).json({
            ...NewPatient._doc,
            message: `new patient ${Patient_name} Created`
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

const DeletePatient = async (req, res) => {
    try {
        const { PsychiatristID, password } = req.body, { PatientID } = req.params;
        const result = await Psychiatrist.findById(PsychiatristID);
        if (!result || (Encrypt(password) != result.password) || !result.patients.includes(PatientID)) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        const patient = await Patient.deleteOne({ _id: PatientID }).populate('phone');
        await Hospital.updateOne({ _id: result.HospitalID }, {
            $inc: {
                patients_count: -1
            }
        })
        await Psychiatrist.updateOne({ _id: PsychiatristID }, {
            $pull: {
                patients: PatientID
            }
        });
        res.status(200).json({ ...patient });
    } catch (err) {
        res.status(400).json(arr);
    }
}


Router.route('/create').post(RegisterPatient)
Router.route('/delete/:PatientID').delete(DeletePatient);

module.exports = Router;