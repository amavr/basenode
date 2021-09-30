'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({ title: 'Hello Public Express!' });
});

module.exports = router;
