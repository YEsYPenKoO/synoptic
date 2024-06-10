const express = require('express');
const router = express.Router();

router.get('/example', (req, res) => {
    res.render('example', { title: 'Example Page' });
});

module.exports = router;
