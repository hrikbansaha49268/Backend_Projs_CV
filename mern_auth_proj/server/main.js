const cors = require('cors');
const express = require("express");
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hrikbans:looper@cluster0.jydd6pg.mongodb.net/mern-stack-auth?retryWrites=true&w=majority&appName=Cluster0');

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Hello World" });
});

app.post('/api/register', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(200).send({ status: 'ok', user: user });
    } catch (error) {
        res.status(401).json({ status: 'error', error: 'Duplicate email' });
    };
});


app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (user) {
        const token = jwt.sign({ email: user.email, name: user.name }, 'Dhakuria');
        res.status(200).send({ status: 'ok', user: token });
    } else {
        res.status(404).json({ status: 'error', user: false });
    }
});

app.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'Dhakuria');

        const email = decoded.email;

        const user = await User.findOne({ email: email });
        return { status: 'ok', quote: user.quote };
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    }
});


app.post('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'Dhakuria');

        const email = decoded.email;

        const user = await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        );

        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    }
});

app.listen(8080, () => {
    console.log(`Server started on http://localhost:${8080}`)
});