const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('diagnosis-result', { title: 'Diagnosis Result' });
});

module.exports = router;
