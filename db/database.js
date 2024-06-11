const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/communityHealth.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the communityHealth database.');
});

const getProfiles = (callback) => {
  const query = 'SELECT profile_id, first_name, last_name FROM Profiles';
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};

const getProfileById = (profileId, callback) => {
  const query = 'SELECT * FROM Profiles WHERE profile_id = ?';
  db.get(query, [profileId], (err, row) => {
    callback(err, row);
  });
};

const getPrescriptions = (profileId, callback) => {
  const query = `
      SELECT prescription_id, medication_name, dosage, frequency, start_date, end_date
      FROM Prescriptions
      WHERE profile_id = ?
  `;
  db.all(query, [profileId], (err, rows) => {
      callback(err, rows);
  });
};

const verifyPin = (profileId, pin, callback) => {
  const query = 'SELECT 1 FROM Profiles WHERE profile_id = ? AND profile_pin = ?';
  db.get(query, [profileId, pin], (err, row) => {
    if (err) {
      callback(err, false);
    } else {
      callback(null, !!row);
    }
  });
};

const getProfilesByHousehold = (householdId, callback) => {
  const query = 'SELECT profile_id, first_name, last_name FROM Profiles WHERE household_id = ?';
  db.all(query, [householdId], (err, rows) => {
    callback(err, rows);
  });
};

const authenticateHousehold = (mobileNumber, familyPassword, callback) => {
  const query = 'SELECT * FROM Households WHERE mobile_number = ? AND family_password = ?';
  db.get(query, [mobileNumber, familyPassword], (err, row) => {
    callback(err, row);
  });
};

const addPrescriptionRequest = (profileId, prescriptionId, callback) => {
  const query = `
      INSERT INTO RequestPrescriptions (profile_id, prescription_id, date_requested)
      VALUES (?, ?, datetime('now'))
  `;
  db.run(query, [profileId, prescriptionId], (err) => {
    callback(err);
  });
};

const addProfile = (firstname, surname, dateOfBirth, sex, pin, householdId, callback) => {
  const query = 'INSERT INTO Profiles (first_name, last_name, date_of_birth, sex, profile_pin, household_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [firstname, surname, dateOfBirth, sex, pin, householdId], function(err) {
      if (err) {
          console.error('Database Insertion Error:', err); // Add this line
      } else {
          console.log('New profile added with ID:', this.lastID); // Add this line
      }
      callback(err, this.lastID); // this.lastID contains the ID of the newly created profile
  });
};


const getVaccinations = (profileId, callback) => {
  const query = 'SELECT * FROM Vaccinations WHERE profile_id = ?';
  db.all(query, [profileId], (err, rows) => {
    callback(err, rows);
  });
};

const getAppointmentsByProfileId = (profileId, callback) => {
  const query = 'SELECT * FROM Appointments WHERE profile_id = ?';
  db.all(query, [profileId], (err, rows) => {
      callback(err, rows);
  });
};

const getAllUpcomingAppointments = (callback) => {
  const query = 'SELECT * FROM Appointments WHERE appointment_date >= ? AND status = "Available"';
  db.all(query, [new Date().toISOString().split('T')[0]], (err, rows) => {
    callback(err, rows);
  });
};

const bookAppointment = (appointmentId, profileId, callback) => {
  const query = `
    UPDATE UpcomingAppointments
    SET status = "Booked", profile_id = ?
    WHERE appointment_id = ?
  `;
  db.run(query, [profileId, appointmentId], function (err) {
    if (err) {
      console.error('Error booking appointment:', err);
      callback(err);
    } else {
      console.log('Appointment booked with ID:', appointmentId);
      callback(null);
    }
  });
};

const addPrescription = (profile_id, medication_name, dosage, frequency, start_date, end_date, callback) => {
  const query = `
    INSERT INTO Prescriptions (profile_id, medication_name, dosage, frequency, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  console.log('Adding prescription:', profile_id, medication_name, dosage, frequency, start_date, end_date);
  db.run(query, [profile_id, medication_name, dosage, frequency, start_date, end_date], function (err) {
    if (err) {
      console.error('Error inserting prescription:', err);
      callback(err);
    } else {
      console.log('Prescription added with ID:', this.lastID);
      callback(null);
    }
  });
};
// Function to add an appointment to the database
const addAppointment = (appointmentDate, appointmentTime, appointmentType, status, notes, callback) => {
  const query = `
      INSERT INTO Appointments (appointment_date, appointment_time, appointment_type, status, notes)
      VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [appointmentDate, appointmentTime, appointmentType, status, notes], (err) => {
      callback(err);
  });
};

module.exports = {
  getProfiles,
  getProfileById,
  getPrescriptions,
  verifyPin,
  getProfilesByHousehold,
  authenticateHousehold,
  addPrescriptionRequest,
  addProfile,
  getVaccinations,
  getAppointmentsByProfileId,
  getAllUpcomingAppointments,
  bookAppointment,
  addPrescription, 
  addAppointment 
};
