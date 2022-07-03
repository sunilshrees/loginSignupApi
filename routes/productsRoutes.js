const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
    res.status(200).json({ msg: 'hello product' });
});

module.exports = router;
