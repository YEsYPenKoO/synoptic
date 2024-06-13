/*
 * Author: Will Rayner
 * Description: This Express server sets up routes for a healthcare application, including login, dashboard, 
 * prescription management, profile selection, appointments, admin features, FAQs, self-diagnosis, registration,
 * and diagnosis result handling.
 * Last Updated: [12/06/2024] by Ed Turner and Liberty Harrington
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies for form data
app.use(bodyParser.urlencoded({ extended: false }));

// Setup session middleware
app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// Define routes using middleware
const loginRouter = require('./routes/login-route');
const chooseaccountRouter = require('./routes/chooseaccount-route');
const dashboardRouter = require('./routes/dashboard-route');
const prescriptionRouter = require('./routes/prescription-route');
const addpersonRouter = require('./routes/addperson-route'); 
const adminRouter = require('./routes/admin-route'); 
const appointmentsRouter = require('./routes/appointments-route'); 
const logoutRouter = require('./routes/logout-route');
const FAQsRouter = require('./routes/FAQs-route');
const selfDiagnosisRouter = require('./routes/self-diagnosis-router');
const registerRouter = require('./routes/register-route');
const diagnosisResult = require('./routes/diagnosis-result-route');

// Route middleware
app.get('/get-profile-id', (req, res) => {
    const profileId = req.session.profileId;
    if (profileId) {
        res.json({ profileId });
    } else {
        res.status(404).json({ error: 'Profile ID not found' });
    }
});

// Use routers
app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chooseaccount', chooseaccountRouter);
app.use('/chooseaccount/add-profile', addpersonRouter); // Updated path for addpersonRouter
app.use('/prescription', prescriptionRouter);
app.use('/appointments', appointmentsRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);
app.use('/FAQs', FAQsRouter);
app.use('/self-diagnosis', selfDiagnosisRouter); // Ensure this line is correct
app.use('/register', registerRouter);
app.use('/diagnosis-result', diagnosisResult);

// Redirect root URL to login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server on port 3000 or environment variable PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
