const Router = require('express').Router();
const Hospital = require('../models/Hospital.js')
const Psychiatrist = require('../models/Psychiatrist.js')

const CreateNewHospital = async (req, res) => {
    try {
        const { hospital_name } = req.body;
        const result = await Hospital.create({
            hospital_name
        });
        res.status(200).json({...result});
    } catch(err) {
        res.status(400).json(err);
    }
}

const UpdateHospital = async (req, res) => {
    try {
        const { hospital_name, id } = req.body;
        const result = await Hospital.updateOne({_id : id}, {
            $set : {
                hospital_name : hospital_name
            }
        });
        res.status(200).json({...result});
    } catch(err) {
        res.status(400).json(err);
    }
}

const Hospitaldetails = async (req, res) => {
    try {
        const { HospitalID } = req.params;
        const Details = await Hospital.findById(HospitalID).populate('Psychiatrists');
        if (!Details) {
            return res.status(400).json({message : "HospitalID is Not valid"});
        }
        res.status(200).json({...Details});
    } catch (err) {
        res.status(400).json(err);
    }
};

Router.route('/Create')
    .post(CreateNewHospital).patch(UpdateHospital)
Router.route('/details/:HospitalID').get(Hospitaldetails);

module.exports = Router;

