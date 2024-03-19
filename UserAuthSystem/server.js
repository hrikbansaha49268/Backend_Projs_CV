/* Imports */
const express = require("express");
const db = require('./utilities/databse');
const bodyParser = require('body-parser');
const { authroutes } = require("./routes/auth");
const path = require('path');
/* Imports */


// Constants
const PORT = 8080;
const URL = "http://localhost" || "http://192.168.0.177";

// Middlewares
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authroutes);


// Route to Homepage
app.get("/", (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

app.get("/secured/:id", (req, res) => {
    const userid = req.params.id;
    const userData = db.User.findById(userid);
    console.log(userData.username);
    // res.status(200).send(`<h1>${userData.username}</h1>`);
    res.status(200).send({ da: userData });
});


// Starting the server with db connection
app.listen(PORT, () => {
    try {
        console.log(`App is running on ${URL}:${PORT}`);
        db.dbConnector();
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    }
});