const { Router } = require('express');
const utility = require('../utilities/passwordUtils');
const db = require('../utilities/databse');

const authroutes = Router();

authroutes.post("/signup", async (req, res, next) => {
    try {
        const password = utility.generateHashedPassword(req.body.password);
        const user = new db.User({
            email: req.body.email,
            username: req.body.username,
            password: password,
        });
        await user.save();
        res.status(200).redirect(`/secured?id=${user._id}`);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        res.end();
        console.log(error);
    };
});

authroutes.post("/login", async (req, res, next) => {
    try {
        const useremail = req.body.email;
        const user = await db.User.findOne({ email: useremail });
        if (user != null) {
            const password = req.body.password;
            const hashedPassword = user.password;
            const result = utility.checkPassword(password, hashedPassword);
            if (result) {
                res.status(200).redirect(`/secured/${user._id}`);
                next();
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