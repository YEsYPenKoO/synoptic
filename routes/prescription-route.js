const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const profileId = req.session.profileId;
    db.getPrescriptions(profileId, (err, prescriptions) => {
        if (err) {
            console.error('Error fetching prescriptions:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('prescription', { prescriptions }); // Pass prescriptions including prescription_id to the view
        }
    });
});


router.post('/request', (req, res) => {
    const profileId = req.session.profileId;
    const prescriptionId = req.body.prescription_id;
    db.addPrescriptionRequest(profileId, prescriptionId, (err) => {
        if (err) {
            console.error('Error adding prescription request:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/prescription');
        }
    });
});


module.exports = router;
