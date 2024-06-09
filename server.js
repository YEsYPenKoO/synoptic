// In your main app file (app.js or index.js), ensure you have the correct routing setup:

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false
}));

// Import and use routes
const loginRouter = require('./routes/login-route');
const chooseaccountRouter = require('./routes/chooseaccount-route'); // Make sure to import the chooseaccount router
const dashboardRouter = require('./routes/dashboard-route');

app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chooseaccount', chooseaccountRouter); // Mount chooseaccountRouter on /chooseaccount path

// Redirect root URL to login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
