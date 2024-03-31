import { connect, MongooseError } from "mongoose";

const connectMongo = async () => {
    try {
        await connect(process.env.MONGO_URI!);
        return Promise.resolve('DB Connected');
    } catch (error: any) {
        return Promise.reject(new MongooseError(error));
    };
};


export default connectMongo;