const { Router } = require('express');
const Quotes = require('../Database/models/Quotes');
const User = require('../Database/models/User');
const { tokenVerification } = require('../utilities/tokenization');

const protectedRouter = Router();

protectedRouter.get('/api/allquotes', async (req, res) => {
    let quotesList = null;
    const users = await User.find();
    users.forEach(async e => {
        quotesList = await Quotes.findOne({ email: e.email });
        // authorsQuotes.quotes.forEach(elem => {
        //     quotesList.push({ theQuote: e.name, author: elem });
        // });
    });
    res.status(200).send(quotesList);
});

protectedRouter.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = tokenVerification(token);
        const email = decoded.email;
        const user = await Quotes.findOne({ email: email });
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
        await Quotes.updateOne(
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
