const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/register', (req, res, next) => {
    api.register(req, res, next);
});

module.exports = router;
