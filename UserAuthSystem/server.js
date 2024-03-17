// Imports
const bodyParser = require('body-parser');
const express = require("express");
const utility = require('./utilities');


// Middlewares
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;
const URL = "http://localhost" || "http://192.168.0.177";

app.get("/", (req, res) => {
    try {
        res.send("<h1>Hello World</h1>");
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

app.post("/signup", (req, res) => {
    try {
        const username = req.body.username;
        const password = utility.generateHashedPassword(req.body.password);
        res.status(200).send({ username, password });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = req.body.hashedPass;
    const result = utility.checkPassword(password, hashedPassword);

    res.status(result ? 200 : 404).send(result ? "Valid" : "Invalid");
});

app.listen(PORT, () => {
    try {
        console.log(`App is running on ${URL}:${PORT}`);
    } catch (error) {
        console.log(error);
    }
});