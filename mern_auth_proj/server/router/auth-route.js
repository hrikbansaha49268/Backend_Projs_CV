const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../Database/models/User');
const jwt = require('jsonwebtoken');

const authRouter = Router();

// TODO: Tokenization and Password hashing needs to be shifted in another folder

authRouter.post('/api/register', async (req, res) => {
    const SALT = bcrypt.genSaltSync(10);
    const userPass = bcrypt.hashSync(req.body.password, SALT);
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: userPass
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
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ email: user.email, name: user.name }, 'Dhakuria');
            res.status(200).send({ status: 'ok', user: token });
        } else {
            res.status(401).json({ status: 'error', user: false });
        }
    } else {
        res.status(404).json({ status: 'error', user: false });
    };
});

module.exports = { authRouter };