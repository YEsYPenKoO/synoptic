// app.js

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
    saveUninitialized: false
}));

// Import routes
const loginRouter = require('./routes/login-route');
const chooseaccountRouter = require('./routes/chooseaccount-route');
const dashboardRouter = require('./routes/dashboard-route');
const prescriptionRouter = require('./routes/prescription-route');
const addpersonRouter = require('./routes/addperson-route'); // Import the addperson route
const exampleRouter = require('./routes/example-route'); 

// Use routes
app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chooseaccount', chooseaccountRouter);

// Redirect root to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
