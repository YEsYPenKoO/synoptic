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
  SELECT medication_name, dosage, frequency, start_date, end_date
  FROM Prescriptions
  WHERE profile_id = ?`;
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
      callback(null, !!row); // Return true if row exists, false otherwise
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

module.exports = {
  getProfiles,
  getProfileById,
  getPrescriptions,
  verifyPin,
  getProfilesByHousehold,
  authenticateHousehold
};