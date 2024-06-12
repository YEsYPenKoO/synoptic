const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET route to render the form
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
        
        res.render('selfdiagnosis', { profile });
    });
});

// POST route to handle form submissions
router.post('/', (req, res) => { // Changed the route path to '/'
    const { description, duration, 'pain-severity': painSeverity, symptoms } = req.body;

    if (!description || !duration || !painSeverity || !symptoms) {
        return res.status(400).send('All fields are required');
    }

    // Process the form data to diagnose the user
    const diagnosis = diagnoseUser(description, duration, painSeverity, symptoms);

    // Render a results page or return the diagnosis
    res.render('diagnosis-result', { diagnosis });
});

// Function to diagnose the user based on form data
function diagnoseUser(description, duration, painSeverity, symptoms) {
    // Implement your diagnosis logic here
    let diagnosis = 'Based on your symptoms, it is recommended to consult a doctor.';

    const malariaSymptoms = ['Tiredness', 'hot', 'Headache', 'sorethroat'];
    const userSymptoms = Array.isArray(symptoms) ? symptoms : [symptoms]; // Ensure symptoms is an array

    let malariaSymptomCount = 0;
    for (let symptom of malariaSymptoms) {
        if (userSymptoms.includes(symptom)) {
            malariaSymptomCount++;
        }
    }

    if (malariaSymptomCount >= 3) {
        diagnosis = 'You may have malaria. Please seek immediate medical attention.';
    } else if (painSeverity >= 8) {
        diagnosis = 'You might be experiencing severe pain. Please seek immediate medical attention.';
    } else if (userSymptoms.includes('hardbreathe')) {
        diagnosis = 'Difficulty breathing can be a serious symptom. Please consult a healthcare provider.';
    } else if (duration === 'morethanmonth' && userSymptoms.includes('lostweight')) {
        diagnosis = 'Unintended weight loss over a month can indicate a serious condition. Consult a doctor.';
    }

    return diagnosis;
}

module.exports = router;
