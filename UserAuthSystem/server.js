/* Imports */
const express = require("express");
const db = require('./utilities/databse');
const bodyParser = require('body-parser');
const { authroutes } = require("./routes/auth");
const cors = require('cors');
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
/* Imports */


// Constants
const PORT = 8080;
const URL = "http://localhost" || "http://192.168.0.177";

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.set('view engine', 'ejs');
app.use(authroutes);


// Route to Homepage
app.get("/", (req, res) => {
    try {
        res.status(200).render('index', { messages: req.flash() });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

app.get("/secured/:id", async (req, res) => {
    try {
        const userid = req.params.id;
        const userData = await db.User.findById(userid);
        res.status(200).render('secured', { username: userData._doc.username, error: false });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error);
    };
});

app.get("/secured", async (req, res) => {
    try {
        const userid = req.params.id;
        const userData = await db.User.findById(userid);
        res.status(200).render('secured', { username: userData._doc.username, error: false });
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