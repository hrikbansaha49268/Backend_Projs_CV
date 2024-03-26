const { Router } = require('express');
const User = require('../Database/models/User');
const jwt = require('jsonwebtoken');
const { passwordHasher, passwordChecker } = require('../utilities/passwordUtil');
const { tokenSign } = require('../utilities/tokenization');

const authRouter = Router();

authRouter.post('/api/register', async (req, res) => {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordHasher(req.body.password)
            });
            res.status(200).send({ status: 'ok', user: user });
        } catch (error) {
            res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        };
    } else {
        res.status(401).json({ status: 'error', error: 'Duplicate Email' });
    };
});

authRouter.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordCorrect = passwordChecker({ plainPass: req.body.password, hashedPass: user.password });
        if (isPasswordCorrect) {
            res.status(200).send({ status: 'ok', user: tokenSign() });
        } else {
            res.status(401).json({ status: 'error', user: false });
        };
    } else {
        res.status(404).json({ status: 'error', user: false });
    };
});

module.exports = { authRouter };