const express = require('express');
const router = express.Router();
const db = require('../db/database');

// prescription-route.js
router.get('/', (req, res) => {
    const profileId = req.session.profileId;
    db.getPrescriptions(profileId, (err, prescriptions) => {
        if (err) {
            console.error('Error fetching prescriptions:', err);
            res.status(500).send('Internal Server Error');
        } else {
            db.getVaccinations(profileId, (err, vaccinations) => {
                if (err) {
                    console.error('Error fetching vaccinations:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('prescription', { prescriptions, vaccinations });
                }
            });
        }
    });
});


// prescription-route.js
router.post('/request', (req, res) => {
    const profileId = req.session.profileId;
    const prescriptionId = req.body.prescription_id;
    db.addPrescriptionRequest(profileId, prescriptionId, (err) => {
        if (err) {
            console.error('Error adding prescription request:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'Prescription request has been added successfully!' });
        }
    });
});

module.exports = router;
