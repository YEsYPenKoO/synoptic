const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/database'); // Ensure you have the database module to interact with the database

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Route to serve the admin page
router.get('/', (req, res) => {
    res.render('admin');
});

// Route to handle prescription file uploads
router.post('/upload-prescriptions', upload.single('prescriptions'), (req, res) => {
    const filePath = req.file.path;
    console.log(`Processing file: ${filePath}`);

    // Read and process the uploaded JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        try {
            const prescriptions = JSON.parse(data).prescriptions;
            console.log('Parsed prescriptions:', prescriptions);

            prescriptions.forEach(prescription => {
                console.log('Processing prescription:', prescription);
                db.addPrescription(
                    prescription.profile_id,
                    prescription.medication_name,
                    prescription.dosage,
                    prescription.frequency,
                    prescription.start_date,
                    prescription.end_date,
                    (err) => {
                        if (err) {
                            console.error('Error adding prescription:', err);
                        } else {
                            console.log('Successfully added prescription:', prescription);
                        }
                    }
                );
            });

            res.send('Prescriptions uploaded and processed successfully');
        } catch (err) {
            console.error('Error processing JSON data:', err);
            res.status(500).send('Error processing JSON data');
        }
    });
});

// Route to handle appointment file uploads
router.post('/upload-appointments', upload.single('appointments'), (req, res) => {
    const filePath = req.file.path;
    console.log(`Processing file: ${filePath}`);

    // Read and process the uploaded JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        try {
            const appointments = JSON.parse(data).appointments;
            console.log('Parsed appointments:', appointments);

            appointments.forEach(appointment => {
                console.log('Processing appointment:', appointment);
                db.addAppointment(
                    appointment.appointment_date,
                    appointment.appointment_time,
                    appointment.appointment_type,
                    appointment.status,
                    appointment.notes,
                    (err) => {
                        if (err) {
                            console.error('Error adding appointment:', err);
                        } else {
                            console.log('Successfully added appointment:', appointment);
                        }
                    }
                );
            });

            res.send('Appointments uploaded and processed successfully');
        } catch (err) {
            console.error('Error processing JSON data:', err);
            res.status(500).send('Error processing JSON data');
        }
    });
});

module.exports = router;
