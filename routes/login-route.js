// login-route.js

const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', (req, res) => {
    const { mobileNumber, familyPassword } = req.body;

    db.authenticateHousehold(mobileNumber, familyPassword, (err, household) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (!household) {
           
            return res.status(401).send('Invalid mobile number or family password');
        }

        req.session.householdId = household.household_id;

        res.redirect('/chooseaccount');
    });
});


module.exports = router;
