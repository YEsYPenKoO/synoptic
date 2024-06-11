const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('FAQs', { title: 'FAQs' });
});

module.exports = router;
