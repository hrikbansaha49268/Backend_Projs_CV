const { Router } = require('express');
const User = require('../Database/models/User');
const jwt = require('jsonwebtoken');

const protectedRouter = Router();

protectedRouter.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'Dhakuria');
        const email = decoded.email;
        // TODO: Move quotes to another collection name it 'quotes-data'
        const user = await User.findOne({ email: email });
        return { status: 'ok', quote: user.quote };
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    }
});


protectedRouter.post('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, 'Dhakuria');
        const email = decoded.email;
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        );
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(498).json({ status: 'error', error: 'invalid token' });
    }
});

module.exports = { protectedRouter };
