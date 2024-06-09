// login-route.js

const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/login', (req, res) => {
    res.render('login'); // Assuming 'login.ejs' is the name of your login page
});

router.post('/login', (req, res) => {
    const { mobileNumber, familyPassword } = req.body;

    // Authenticate the household
    db.authenticateHousehold(mobileNumber, familyPassword, (err, household) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!household) {
            // If authentication fails, send a 401 Unauthorized response
            return res.status(401).send('Invalid mobile number or family password');
        }

        // If authentication succeeds, store the householdId in the session
        req.session.householdId = household.household_id;

        // Redirect to the choose account page
        res.redirect('/chooseaccount');
    });
});


module.exports = router;
