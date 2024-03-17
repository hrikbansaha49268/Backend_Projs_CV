const mongoose = require("mongoose");

const URI = "mongodb+srv://hrikbans:looper@cluster0.jydd6pg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbConnector = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(URI);
        console.log("Connected to Database...");
    } catch (error) {
        console.log(error);
    };
};

const User = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = { dbConnector, User: mongoose.model('User', User) };