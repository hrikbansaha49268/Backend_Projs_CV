const { Schema, model } = require('mongoose');

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        quotes: []
    },
    {
        collection: 'user-data'
    }
);

const modeL = model('UserData', User);

module.exports = modeL;