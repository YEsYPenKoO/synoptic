const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Route to render the register page
router.get('/', (req, res) => {
    res.render('register');
});

// Route to handle registration form submission
router.post('/', (req, res) => {
    const { householdName, mobileNumber, familyPassword } = req.body;

    // Check if the mobile number is already registered
    db.checkHouseholdExistence(mobileNumber, (err, exists) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (exists) {
            return res.status(400).send('Mobile number is already registered');
        }

        // If mobile number is not registered, insert new household
        db.addHousehold(householdName, mobileNumber, familyPassword, (err, newHouseholdId) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            // Redirect to login page after successful registration
            res.redirect('/login');
        });
    });
});

module.exports = router;
