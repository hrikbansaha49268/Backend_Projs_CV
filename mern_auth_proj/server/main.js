const cors = require('cors');
const express = require("express");
const { authRouter } = require('./router/auth-route');
const { protectedRouter } = require('./router/protected-route');
const { connectMongo } = require('./Database/Connector');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Using routers
app.use(authRouter);
app.use(protectedRouter);


app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Hello World" });
});

app.listen(process.env.PORT, async () => {
    const dbConnected = await connectMongo();
    if (dbConnected) {
        console.log(`Server started on http://localhost:${process.env.PORT}/`);
    } else {
        app.close();
    };
});