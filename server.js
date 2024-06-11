const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// Import routes
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

// Route to get profile ID
app.get('/get-profile-id', (req, res) => {
    const profileId = req.session.profileId;
    if (profileId) {
        res.json({ profileId });
    } else {
        res.status(404).json({ error: 'Profile ID not found' });
    }
});

// Use routes
app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chooseaccount', chooseaccountRouter);
app.use('/chooseaccount/add-profile', addpersonRouter); 
app.use('/prescription', prescriptionRouter);
app.use('/appointments', appointmentsRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);
app.use('/FAQs', FAQsRouter);
app.use('/self-diagnosis', selfDiagnosisRouter);
app.use('/register', registerRouter);

// Redirect root to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
