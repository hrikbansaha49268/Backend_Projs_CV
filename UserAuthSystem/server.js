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

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Route to Homepage
app.get("/", (req, res) => {
    try {
        res.status(200).render("layout.ejs");
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
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