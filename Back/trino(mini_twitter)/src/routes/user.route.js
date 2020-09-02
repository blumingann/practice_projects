const { Router } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { SECRET_KEY } = require('../config');
const { hash } = require('bcrypt');
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const passHash = await hash(req.body.password, 10);
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            hash: passHash,
        });
        const userData = {
            email: newUser.email,
            username: newUser.username,
            id: newUser._id
        };
        const token = jwt.sign(userData, SECRET_KEY);
        res.status(201).json({
            token: token,
            user: userData
        });
    } catch (error) {
        next(error);
    }
})


router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const include = req.query.include;
        const exclude = req.query.exclude;

        const doc = await User.findById(userId)
            .populate('tweets', 'text author')
            .select(include || exclude)
            .lean();

        if (doc) {
            res.json({
                count: 1,
                value: doc,
            });
        } else {
            res.status(404).json({
                error: 'No hay usuario con este ID',
            });
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:userId', async (req, res, next) => {
    try {

        const doc = await Team.findByIdAndDelete(req.params.userId)
            .lean();

        if (doc) {
            res.json({
                count: 1,
                value: doc,
            });
        } else {
            res.status(404).json({
                error: 'No hay usuario con este ID',
            });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
