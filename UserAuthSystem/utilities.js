const bcrypt = require("bcrypt");

const SALTROUNDS = 10;

function generateHashedPassword(pass) {
    try {
        const salt = bcrypt.genSaltSync(SALTROUNDS);
        const hashedPass = bcrypt.hashSync(pass, salt);
        return hashedPass;
    } catch (error) {
        console.log(error);
    }
};

function checkPassword(pass, hashedPass) {
    try {
        const passwordOk = bcrypt.compareSync(pass, hashedPass);
        return passwordOk;
    } catch (error) {
        console.log(error);
    };
};

module.exports = { generateHashedPassword, checkPassword };