const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Route to render the chooseaccount page with the list of profiles
router.get('/', (req, res) => {
    const householdId = req.session.householdId;
    db.getProfilesByHousehold(householdId, (err, profiles) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('chooseaccount', { profiles });
    });
});


router.get('/check-pin', (req, res) => {
    console.log('check-pin route hit');
    const profileId = req.query.profile_id;
    const pin = req.query.pin;

    console.log(`Received profileId: ${profileId}`);
    console.log(`Received pin: ${pin}`);

    db.verifyPin(profileId, pin, (err, success) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        console.log(`verifyPin returned: ${success}`);

        res.json({ success });
    });
});

router.get('/store-profile-in-session', (req, res) => {
    const profileId = req.query.profile_id;

    db.getProfileById(profileId, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        if (!profile || req.session.householdId !== profile.household_id) {

            return res.json({ success: false, message: 'Profile not found or does not belong to the same household' });
        }

        req.session.profileId = profileId;
        res.json({ success: true });
    });
});
module.exports = router;
