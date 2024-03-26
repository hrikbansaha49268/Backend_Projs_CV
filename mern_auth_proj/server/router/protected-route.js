const { Router } = require('express');
const Quotes = require('../Database/models/Quotes');
const { tokenVerification } = require('../utilities/tokenization');

const protectedRouter = Router();

protectedRouter.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = tokenVerification(token);
        const email = decoded.email;
        // TODO: Move quotes to another collection name it 'quotes-data'
        const user = await Quotes.findOne({ email: email });
        console.log(user.quotes);
        return { status: 'ok', quotes: user.quotes };
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
