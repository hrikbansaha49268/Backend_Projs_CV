const jwt = require('jsonwebtoken');

function tokenSign({ email, name }) {
    try {
        const token = jwt.sign({ email, name }, process.env.TOKEN_SECRET);
        return token;
    } catch (error) {
        throw new Error(error);
    };
};

function tokenVerification(tokenItem) {
    try {
        const token = jwt.verify(tokenItem, process.env.TOKEN_SECRET);
        return token;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { tokenSign, tokenVerification };