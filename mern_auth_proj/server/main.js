const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Hello World" });
});

app.listen(8080, () => {
    console.log(`Server started on http://localhost:${8080}`)
});