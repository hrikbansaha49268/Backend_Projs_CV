const { Schema, model } = require('mongoose');

const Quotes = new Schema(
    {
        email: { type: String, required: true, unique: true },
        quotes: [{ quote: String }]
    },
    {
        collection: 'quotes-data'
    }
);

const modeL = model('QuotesData', Quotes);

module.exports = modeL;