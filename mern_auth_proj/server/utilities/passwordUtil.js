const bcrypt = require("bcrypt");

const SALTROUNDS = 10;

function passwordHasher(plainPass) {
    try {
        const SALT = bcrypt.genSaltSync(SALTROUNDS);
        const userPass = bcrypt.hashSync(plainPass, SALT);
        return userPass;
    } catch (error) {
        console.log(error);
    };
};

function passwordChecker({ plainPass, hashedPass }) {
    try {
        const isPasswordCorrect = bcrypt.compareSync(plainPass, hashedPass);
        return isPasswordCorrect;
    } catch (error) {
        console.log(error);
    };
};

module.exports = { passwordHasher, passwordChecker };