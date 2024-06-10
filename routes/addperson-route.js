// addperson-route.js

const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Route to render the addperson page
router.get('/', (req, res) => {
    res.render('addperson'); // Assuming the addperson.ejs file is in the views folder
});

router.post('/', (req, res) => {
    const { firstname, surname, dateOfBirth, sex, pin } = req.body;
    const householdId = req.session.householdId; // Get householdId from session

    db.addProfile(firstname, surname, dateOfBirth, sex, pin, householdId, (err) => { // Pass householdId to addProfile
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/chooseaccount'); // Redirect to chooseaccount page after adding profile
    });
});


module.exports = router;
