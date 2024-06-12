// login-route.js

const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null }); // Ensure errorMessage is defined on initial load
});

router.post('/login', (req, res) => {
    const { mobileNumber, familyPassword } = req.body;

    db.authenticateHousehold(mobileNumber, familyPassword, (err, household) => {
        if (err) {
            console.error(err);
            return res.status(500).render('login', { errorMessage: 'Internal Server Error' });
        }

        if (!household) {
            return res.status(401).render('login', { errorMessage: 'Invalid phone number or family password' });
        }

        req.session.householdId = household.household_id;

        res.redirect('/chooseaccount');
    });
});

module.exports = router;
