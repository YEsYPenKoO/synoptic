const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Logout failed');
        }
        res.status(200).send('Logout successful');
    });
});

module.exports = router;
