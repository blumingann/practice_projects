const User = require('../models/User');
const express = require('express');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const checkJwt = require("express-jwt");
const { SECRET_KEY } = require('../../config');
const router = express.Router();

router.post('/signup', async (req, res, next) => {

    try {

        const user = req.body;

        // hashear pass con bcrypt y almacenarla
        const passwordHash = await hash(user.password, 10);

        const newUser = await User.create({
            email: user.email,
            hash: passwordHash,
        });

        // token
        const userPayload = { email: newUser.email };
        const token = jwt.sign(userPayload, SECRET_KEY);

        res.json({
            user: userPayload,
            token,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });


        if (!user) {
            return res.status(404).json({
                error: 'No se encuentra ningún usuario con ese email',
            });
        }
        // chequear password con .compare() de bcrypt
        const match = await compare(req.body.password, user.hash);
        if (!match) {
            return res.status(400).json({
                error: 'El password no es correcto',
            });
        }

        const userPayload = { email: user.email };
        const token = jwt.sign(userPayload, SECRET_KEY);

        res.json({
            user: userPayload,
            token,
        });
    } catch (error) {
        next(error);
    }

})

router.post(
    '/private',
    checkJwt({ secret: SECRET_KEY, algorithms: ['HS256'] }),
    (req, res, next) => {
        try {
            res.json(req.user);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;