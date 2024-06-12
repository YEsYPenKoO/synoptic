const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Route to render the addperson page
router.get('/', (req, res) => {
    res.render('addperson'); // Assuming the addperson.ejs file is in the views folder
});

router.post('/', (req, res) => {
    const { firstname, surname, dateOfBirth, sex, pin } = req.body;
    const householdId = req.session.householdId;

    db.addProfile(firstname, surname, dateOfBirth, sex, pin, householdId, (err, profileId) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        db.getProfileById(profileId, (err, profile) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.json(profile);
        });
    });
});

module.exports = router;
