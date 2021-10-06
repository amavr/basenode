'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('../svc/jwt');

router.get('/', function (req, res, next) {
    res.json({ title: 'Hello Public Express!' });
});

router.post('/v1/auth', function (req, res, next) {
    if (
        req.body.login === 'demo' &&
        req.body.password === 'demo'
    ) {
        const user = {
            id: 100,
            login: req.body.login,
        }

        const answer = {
            payload: {some_key: "some_value"},
            grant: jwt.generate(user, {id: user.id})
        };

        return res.status(200).json(answer);
    }

    return res.status(404).json({ message: 'User not found' })
    // res.json({ title: 'Hello Auth!' });
});

router.get('/v1/auth', function (req, res, next) {
    if (
        req.body.login === 'demo' &&
        req.body.password === 'demo'
    ) {
        const user = {
            id: 100,
            login: req.body.login,
        }

        const answer = {
            payload: {some_key: "some_value"},
            grant: jwt.generate(user, {id: user.id})
        };

        return res.status(200).json(answer);
    }

    return res.status(404).json({ message: 'User not found' })
    // res.json({ title: 'Hello Auth!' });
});

module.exports = router;
