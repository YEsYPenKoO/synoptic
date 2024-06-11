const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const profileId = req.session.profileId; // Fetch profileId from session

    if (!profileId) {
        console.log('No profileId provided');
        return res.status(400).send('No profileId provided');
    }

    db.getProfileById(profileId, (err, profile) => {
        if (err) {
            console.error('Error fetching profile:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!profile) {
            console.log('Profile not found for profileId:', profileId);
            return res.status(404).send('Profile not found');
        }

        db.getAppointmentsByProfileId(profileId, (err, appointments) => {
            if (err) {
                console.error('Error fetching appointments:', err);
                return res.status(500).send('Internal Server Error');
            }

            db.getAllUpcomingAppointments((err, upcomingAppointments) => {
                if (err) {
                    console.error('Error fetching upcoming appointments:', err);
                    return res.status(500).send('Internal Server Error');
                }

                // Render the appointments.ejs template with the appointments and upcomingAppointments data
                res.render('appointments', { profile, appointments, upcomingAppointments });
            });
        });
    });
});

router.post('/book/:id', (req, res) => {
    const appointmentId = req.params.id;
    const profileId = req.session.profileId; // Fetch profileId from session

    if (!profileId) {
        return res.status(400).send('No profileId provided');
    }

    db.bookAppointment(appointmentId, profileId, (err) => {
        if (err) {
            console.error('Error booking appointment:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.redirect('/appointments');
    });
});

router.post('/cancel/:id', (req, res) => {
    const appointmentId = req.params.id;
    const profileId = req.session.profileId; // Fetch profileId from session

    if (!profileId) {
        return res.status(400).send('No profileId provided');
    }

    db.cancelAppointment(appointmentId, (err) => {
        if (err) {
            console.error('Error canceling appointment:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.redirect('/appointments');
    });
});

module.exports = router;
