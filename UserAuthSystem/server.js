// Imports
const express = require("express");
const db = require('./databse');
const bodyParser = require('body-parser');
const { authroutes } = require("./routes/auth");


// Middlewares
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authroutes);

const PORT = 8080;
const URL = "http://localhost" || "http://192.168.0.177";

app.get("/", (req, res) => {
    try {
        res.status(200).send("<h1>Hello World</h1>");
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

app.listen(PORT, () => {
    try {
        console.log(`App is running on ${URL}:${PORT}`);
        db.dbConnector();
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    }
});