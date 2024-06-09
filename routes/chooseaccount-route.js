const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const householdId = req.session.householdId; // Get householdId from session

    // Query the database to get profiles associated with the householdId
    db.getProfilesByHousehold(householdId, (err, profiles) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!profiles || profiles.length === 0) {
            // If no profiles found, send a 404 error
            return res.status(404).send('No profiles found for this household');
        }

        // Render the choose account page with the retrieved profiles
        res.render('chooseaccount', { profiles }); // Assuming 'chooseaccount.ejs' is the name of your choose account page
    });
});

router.get('/check-pin', (req, res) => {
    console.log('check-pin route hit');
    const profileId = req.query.profile_id;
    const pin = req.query.pin;

    console.log(`Received profileId: ${profileId}`);
    console.log(`Received pin: ${pin}`);

    // Query the database to verify the PIN
    db.verifyPin(profileId, pin, (err, success) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        console.log(`verifyPin returned: ${success}`);

        // Send JSON response indicating whether the PIN verification was successful
        res.json({ success });
    });
});

router.get('/store-profile-in-session', (req, res) => {
    const profileId = req.query.profile_id;

    // Query the database to get the profile by ID
    db.getProfileById(profileId, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        if (!profile || req.session.householdId !== profile.household_id) {
            // If profile not found or doesn't belong to the same household, send JSON response with failure
            return res.json({ success: false, message: 'Profile not found or does not belong to the same household' });
        }

        // Store profileId in the session and send JSON response indicating success
        req.session.profileId = profileId;
        res.json({ success: true });
    });
});
module.exports = router;
