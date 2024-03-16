const express = require("express");
const app = express();

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

app.listen(PORT, () => {
    try {
        console.log(`App is running on ${URL}:${PORT}`);
    } catch (error) {
        console.log(error);
    }
});