const { connect, MongooseError } = require("mongoose");

const connectMongo = async () => {
    try {
        await connect(process.env.MONGO_URI);
        return Promise.resolve('DB Connected');
    } catch (error) {
        return Promise.reject(new MongooseError(error));
    };
};

module.exports = { connectMongo };