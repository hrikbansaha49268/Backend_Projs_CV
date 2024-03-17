const { Router } = require('express');
const utility = require('../utilities');
const db = require('../databse');

const authroutes = Router();

authroutes.post("/signup", async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = utility.generateHashedPassword(req.body.password);
        const user = new db.User({
            username: username,
            password: password,
        });
        await user.save();
        res.status(200).send({ msg: "User Created", user });
        res.end();
    } catch (error) {
        res.status(500).send("Internal Server Error");
        res.end();
        console.log(error);
    };
});

authroutes.post("/login", async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await db.User.findOne({ username: username });
        if (user != null) {
            const password = req.body.password;
            const hashedPassword = user.password;
            const result = utility.checkPassword(password, hashedPassword);
            if (result) {
                res.status(200).send({ msg: "User found", ID: user._id });
                res.end();
            } else {
                res.status(401).send("Invalid Password");
                res.end();
            }
        } else {
            res.status(404).send("User not found");
            res.end();
        }
    } catch (error) {
        res.status(500).send("Internal Server Error", error);
        res.end();
    };
});

module.exports = { authroutes };