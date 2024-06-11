// dashboard-route.js
const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const profileId = req.session.profileId;

    if (!profileId) {
        console.log('No profileId provided');
        return res.status(400).send('No profileId provided');
    }

    db.getProfileById(profileId, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!profile) {
            return res.status(500).send('Profile not found');
        }
        
        res.render('selfdiagnosis', { profile});
    });
});


module.exports = router;
