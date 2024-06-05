--To get all profiles associated with households:
SELECT * FROM HouseholdProfiles;

--To get profiles for a specific household:
SELECT * FROM HouseholdProfiles WHERE household_id = 1;

--To get all medical history records for all profiles:
SELECT * FROM ProfileMedicalHistory;

--To get medical history for a specific profile:
SELECT * FROM ProfileMedicalHistory WHERE profile_id = 1;

--To get all prescriptions for all profiles:
SELECT * FROM ProfilePrescriptions;

--To get prescriptions for a specific profile:
SELECT * FROM ProfilePrescriptions WHERE profile_id = 1;

--To get all appointments for all profiles:
SELECT * FROM ProfileAppointments;

--To get vaccinations for a specific profile:

SELECT * FROM ProfileVaccinations WHERE profile_id = 1;
