const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const profileId = req.query.profile_id;

    db.getProfileById(profileId, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!profile) {
            return res.status(404).send('Profile not found');
        }

        db.getPrescriptions(profileId, (err, prescriptions) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('dashboard', { profile, prescriptions });
        });
    });
});

module.exports = router;