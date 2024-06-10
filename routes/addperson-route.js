// addperson-route.js

const express = require('express');
const router = express.Router();

// Route to render the addperson page
router.get('/', (req, res) => {
    res.render('addperson'); // Assuming the addperson.ejs file is in the views folder
});

module.exports = router;
