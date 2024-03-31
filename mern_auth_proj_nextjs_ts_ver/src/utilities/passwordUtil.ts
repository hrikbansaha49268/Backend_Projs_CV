import { genSaltSync, hashSync, compareSync } from 'bcrypt'

const SALTROUNDS = 10;

export function passwordHasher(plainPass: Buffer) {
    try {
        const SALT = genSaltSync(SALTROUNDS);
        const userPass = hashSync(plainPass, SALT);
        return userPass;
    } catch (error) {
        console.log(error);
    };
};

export function passwordChecker(
    { plainPass, hashedPass }
        : { plainPass: Buffer, hashedPass: string }
) {
    try {
        const isPasswordCorrect = compareSync(plainPass, hashedPass);
        return isPasswordCorrect;
    } catch (error) {
        console.log(error);
    };
};