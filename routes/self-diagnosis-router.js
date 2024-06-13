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

function diagnoseUser(description, duration, painSeverity, symptoms) {
    const malariaSymptoms = ['Tiredness', 'hot', 'Headache', 'sorethroat'];
    const userSymptoms = Array.isArray(symptoms) ? symptoms : [symptoms]; 

    let malariaSymptomCount = 0;
    for (let symptom of malariaSymptoms) {
        if (userSymptoms.includes(symptom)) {
            malariaSymptomCount++;
        }
    }

    // if severity is 10 get help immediately
    if (painSeverity == 10) {
        return 'As you are in the highest amount of pain you should get medical help immediately by calling 119 on your phone';
    }

    // if have all symptoms and have had them more than a day seek medical help immediately 
    if (malariaSymptomCount === malariaSymptoms.length && (duration !== 'justhappened' && duration !== 'dayorless')) {
        return 'As you have all the symptoms of malaria and have felt like this for a long time you should get medical help immediately by calling 119 on your phone';
    }

    // if 3 or more symptoms but short duration then come back in 24 hours
    if (malariaSymptomCount >= 3 && (duration === 'justhappened' || duration === 'dayorless')) {
        if (painSeverity >= 7) {
            return 'You have some symptoms for malaria. As your pain is very strong you should book a doctor\'s appointment by clicking <a href="/appointments"><strong> here </strong></a>';
        } else {
            return 'As you have not felt like this for very long you should rest and stay hydrated. If you don\'t feel better within 24 hours, take this form again.';
        }
    }

    // if less than 3 symptoms and short duration then 
    if (malariaSymptomCount < 3 && (duration === 'justhappened' || duration === 'dayorless')) {
        if (painSeverity >= 7) {
            return 'You have some symptoms for malaria. Due to high severity, request a doctor\'s appointment by clicking <a href="/appointments"><strong> here </strong></a>';
        } else {
            return 'As your symptoms are low risk and you have not felt like this for long you should rest and stay hydrated. Complete this form again in a few days.';
        }
    }

    // if less than 3 symptoms and long duration then request an appointment
    if (malariaSymptomCount < 3 && (duration === 'morethanmonth' || duration === 'weekormore')) {
        return 'As your symptoms have been long-lasting you should book a doctor\'s appointment for a check-up by clicking <a href="/appointments"><strong> here </strong></a>';
    }

    return 'Based on your symptoms, it is recommended to consult a doctor by clicking <a href="/appointments"><strong> here </strong></a>';
}



module.exports = router;
