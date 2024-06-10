const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'mySecretKey123',
    resave: false,
    saveUninitialized: false
}));

const loginRouter = require('./routes/login-route');
const chooseaccountRouter = require('./routes/chooseaccount-route'); 
const dashboardRouter = require('./routes/dashboard-route');

app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chooseaccount', chooseaccountRouter);

app.get('/', (req, res) => {
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});