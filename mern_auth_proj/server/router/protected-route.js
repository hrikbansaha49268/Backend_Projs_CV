const { Router } = require('express');
const User = require('../Database/Schema');
const { tokenVerification } = require('../utilities/tokenization');

const protectedRouter = Router();

protectedRouter.get('/api/allquotes', async (req, res) => {
    try {
        const quotesList = [];
        const users = await User.find();
        users.forEach(e => {
            e.quotes.forEach(elem =>
                quotesList.push({
                    theQuote: elem.quote,
                    author: e.name
                }));
        });
        res.status(200).send(quotesList);
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Server Internal Error' });
    };
});

protectedRouter.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = tokenVerification(token);
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        res.status(200).json({ status: 'ok', quotes: user.quotes });
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    };
});


protectedRouter.post('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = tokenVerification(token);
        const email = decoded.email;
        await User.updateOne(
            { email: email },
            { $push: { quotes: { quote: req.body.quote } } }
        );
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    }
});

module.exports = { protectedRouter };
